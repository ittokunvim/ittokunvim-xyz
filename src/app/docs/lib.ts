import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import codeTitle from "remark-code-title";
import remarkLinkCard from "remark-link-card";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

import { formatDate } from "@/app/lib"

const docsSiteUrl = process.env.DOCSSITE_URL;
const dataJsonUrl = docsSiteUrl + "/data.json";

type JsonData = {
  slug: string;
  title: string;
  path: string;
  createdAt: string;
};

type DocData = {
  title: string;
  contentHtml: string;
  createdAt: string;
};

export async function fetchDocsJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(dataJsonUrl, { cache: "force-cache" });
    const data = await response.json();
    data.sort((a: JsonData, b: JsonData) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
    data.forEach((doc: JsonData) => {
      doc.createdAt = formatDate(doc.createdAt);
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDocData(slug: string): Promise<DocData> {
  const docs = await fetchDocsJson();
  const doc = docs.find((doc: JsonData) => doc.slug === slug);

  if (doc === undefined) {
    return {
      title: "",
      contentHtml: "",
      createdAt: "",
    };
  }

  const title = doc.title;
  const contentHtml = await getDocContentHtml(doc.path);
  const createdAt = doc.createdAt;

  if (contentHtml === "") {
    return {
      title: "",
      contentHtml: "",
      createdAt: "",
    };
  }

  return {
    title: title,
    contentHtml: contentHtml,
    createdAt: createdAt,
  };
}

async function getDocContentHtml(path: string): Promise<string> {
  const absoluteUrl = new URL(path, docsSiteUrl);
  const content = await fetch(absoluteUrl.href, { cache: "force-cache" })
    .then((res) => res.text())
    .then((text) => replaceRelativeUrlToAbsoluteUrl(path, text))
    .then((text) => replaceCodeBlockTitle(text))
    .catch((error) => {
      console.error(error);
      return "";
    });

  const remarkContent = await remark()
    .use(remarkGfm)
    .use(codeTitle)
    .use(remarkLinkCard)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  const rehypeContent = await rehype()
    .use(rehypeHighlight)
    .process(remarkContent);
  const contentHtml = rehypeContent.toString();

  return contentHtml;
}

function replaceRelativeUrlToAbsoluteUrl(path: string, content: string): string {
  const splitPath = path.split("/");
  const excludeFilenamePath = splitPath.slice(0, splitPath.length - 1).join("/");
  const absoluteUrl = new URL(excludeFilenamePath, docsSiteUrl);

  const relativeImageRegex = /!?\[[^\]]+\]\((?!https|ftp:\/\/)[^\)]+\)/g
  const imageUrlRegex = /\]\(([^)]+)\)/

  content.match(relativeImageRegex)?.forEach((relativeImage) => {
    if (imageUrlRegex.test(relativeImage)) {
      const url = imageUrlRegex.exec(relativeImage)![1]
      content = content.replace(url, `${absoluteUrl.href}/${url}`)
    }
  })

  const relativeImageTagRegex = /<img src="(?!https|ftp:\/\/)[^"]+"/g
  const imageSrcRegex = /src="([^"]+)"/

  content.match(relativeImageTagRegex)?.forEach((relativeImageTag) => {
    if (imageSrcRegex.test(relativeImageTag)) {
      const src = imageSrcRegex.exec(relativeImageTag)![1]
      content = content.replace(src, `${absoluteUrl.href}/${src}`)
    }
  });

  return content;
}

function replaceCodeBlockTitle(content: string): string {
  const codeBlockTitleRegex = /```[a-zA-Z]+:[\w\.]+/g;
  const filenameRegex = /:[\w\.]+/;

  content.match(codeBlockTitleRegex)?.forEach((codeBlock) => {
    const filename = filenameRegex.exec(codeBlock)![0]
    content = content.replace(filename, ` title="${filename.slice(1)}"`);
  });

  return content
}
