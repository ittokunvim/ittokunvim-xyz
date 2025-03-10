import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import codeTitle from "remark-code-title";
import remarkLinkCard from "remark-link-card";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

import { formatDate } from "@/lib/utils"

const DOCS_SITE_URL = process.env.DOCSSITE_URL || "";

export type JsonData = {
  slug: string;
  title: string;
  description: string,
  path: string;
  createdAt: string;
  updatedAt: string;
};

type DocData = {
  title: string;
  contentHtml: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchDocsJson(): Promise<JsonData[]> {
  const jsonUrl = `${DOCS_SITE_URL}/data.json`;

  try {
    const response = await fetch(jsonUrl, { cache: "force-cache" });
    const data = await response.json();
    data.sort((a: JsonData, b: JsonData) => {
      if (a.updatedAt === b.updatedAt) {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      }
    });
    data.forEach((doc: JsonData) => {
      doc.createdAt = formatDate(doc.createdAt);
      doc.updatedAt = formatDate(doc.updatedAt);
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDocData(slug: string): Promise<DocData> {
  const docs = await fetchDocsJson();
  const jsonData = docs.find((doc: JsonData) => doc.slug === slug);
  const emptyDoc: DocData = {
    title: "",
    contentHtml: "",
    createdAt: "",
    updatedAt: "",
  };

  if (jsonData === undefined) {
    return emptyDoc;
  }

  const title = jsonData.title;
  const contentHtml = await getDocContentHtml(jsonData.path);
  const createdAt = jsonData.createdAt;
  const updatedAt = jsonData.updatedAt;

  if (contentHtml === "") {
    return emptyDoc;
  }

  return { title, contentHtml, createdAt, updatedAt, };
}

async function getDocContentHtml(path: string): Promise<string> {
  const absoluteUrl = new URL(path, DOCS_SITE_URL);
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
  const absoluteUrl = new URL(excludeFilenamePath, DOCS_SITE_URL);

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
