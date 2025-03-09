import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import codeTitle from "remark-code-title";
import remarkLinkCard from "remark-link-card";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";

import { formatDate } from "@/app/lib"

const DOCSSITE_URL = process.env.DOCSSITE_URL || "";
const DOCSSITE_JSON_URL = process.env.DOCSSITE_JSON_URL || "";

type JsonData = {
  slug: string;
  title: string;
  description: string,
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type DocsData = {
  href: string;
  title: string;
  description: string;
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
  try {
    const response = await fetch(DOCSSITE_JSON_URL, { cache: "force-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDocsDataAll(): Promise<DocsData[]> {
  const docs = await fetchDocsJson();
  let docsData: DocsData[] = [{
    href: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  }];

  if (docsData === undefined) {
    return docsData;
  }

  docs.sort((a: JsonData, b: JsonData) => {
    if (a.updatedAt === b.updatedAt) {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else {
      return a.updatedAt < b.updatedAt ? 1 : -1;
    }
  });
  docsData = docs.map((doc: JsonData) => {
    const href = `/docs/${doc.slug}`;
    const title = doc.title;
    const description = doc.description;
    const createdAt = formatDate(doc.createdAt);
    const updatedAt = formatDate(doc.updatedAt);

    return { href, title, description, createdAt, updatedAt, };
  });

  return docsData;
}

export async function getDocsSlugAll(): Promise<string[]> {
  const docs = await fetchDocsJson();
  return docs.map((doc: JsonData) => doc.slug);
}

export async function getDocData(slug: string): Promise<DocData> {
  const docs = await fetchDocsJson();
  const docJson = docs.find((doc: JsonData) => doc.slug === slug);
  let doc: DocData = {
    title: "",
    contentHtml: "",
    createdAt: "",
    updatedAt: "",
  };

  if (docJson === undefined) {
    return doc;
  }

  const title = docJson.title;
  const contentHtml = await getDocContentHtml(docJson.path);
  const createdAt = formatDate(docJson.createdAt);
  const updatedAt = formatDate(docJson.updatedAt);

  if (contentHtml === "") {
    return doc;
  }

  return { title, contentHtml, createdAt, updatedAt, };
}

async function getDocContentHtml(path: string): Promise<string> {
  const absoluteUrl = new URL(path, DOCSSITE_URL);
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
  const absoluteUrl = new URL(excludeFilenamePath, DOCSSITE_URL);

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
