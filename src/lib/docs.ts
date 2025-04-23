import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import codeTitle from "remark-code-title";
import remarkLinkCard from "remark-link-card";
import { rehype } from "rehype";
import rehypeHighlight from "rehype-highlight";
import { formatDate } from "@/lib/utils";

const DOCSSITE_URL = process.env.DOCSSITE_URL || "";
const DOCSSITE_JSON_URL = process.env.DOCSSITE_JSON_URL || "";

type JsonData = {
  slug: string;
  title: string;
  description: string,
  path: string;
  published: boolean,
  createdAt: string;
  updatedAt: string;
};

export type DocData = {
  href: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type DocContentData = {
  title: string;
  description: string;
  contentHtml: string;
  createdAt: string;
  updatedAt: string;
};

// 外部の記事サイトのJSONデータを取得して解析する
async function fetchDocsJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(DOCSSITE_JSON_URL, { cache: "force-cache" });
    const data: JsonData[] = await response.json();

    // 公開するデータのみをフィルタリングして返す
    return data.filter(data => data.published);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 全てのドキュメントデータを取得・整形する
export async function getDocDataAll(): Promise<DocData[]> {
  const docs = await fetchDocsJson();
  let docDataList: DocData[] = [{
    href: "",
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  }];

  // データが取得できない場合、デフォルト値を返す
  if (docs === undefined) {
    return docDataList;
  }

  // 記事を更新日時を基準にソート
  // 同じ更新日時の場合は作成日時を基準にソート
  docs.sort((a: JsonData, b: JsonData) => {
    if (a.updatedAt === b.updatedAt) {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else {
      return a.updatedAt < b.updatedAt ? 1 : -1;
    }
  });

  // データを整形して`DocData`配列を作成
  docDataList = docs.map((doc: JsonData) => {
    const href = `/docs/${doc.slug}`;
    const title = doc.title;
    const description = doc.description;
    const createdAt = formatDate(doc.createdAt);
    const updatedAt = formatDate(doc.updatedAt);

    return { href, title, description, createdAt, updatedAt, };
  });

   return docDataList;
}

// 全ての記事の`slug`の配列を取得
export async function getDocSlugAll(): Promise<string[]> {
  const docs = await fetchDocsJson();
  return docs.map((doc: JsonData) => doc.slug);
}

// 指定した`slug`に対応する記事を取得
export async function getDocData(slug: string): Promise<DocContentData> {
  const docs = await fetchDocsJson();
  const doc = docs.find((doc: JsonData) => doc.slug === slug);
  const docData: DocContentData = {
    title: "",
    description: "",
    contentHtml: "",
    createdAt: "",
    updatedAt: "",
  };

  // データが取得できない場合、デフォルト値を返す
  if (doc === undefined) {
    return docData;
  }

  const title = doc.title;
  const description = doc.description;
  const contentHtml = await getDocContentHtml(doc.path);
  const createdAt = formatDate(doc.createdAt);
  const updatedAt = formatDate(doc.updatedAt);

  // HTMLコンテンツが空の場合、デフォルト値を返す
  if (contentHtml === "") {
    return docData;
  }

  return { title, description, contentHtml, createdAt, updatedAt, };
}

// 指定された`path`の記事のHTMLコンテンツを取得し整形する
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

// 相対URLを絶対URLに変換する関数
function replaceRelativeUrlToAbsoluteUrl(path: string, content: string): string {
  const splitPath = path.split("/");
  const excludeFilenamePath = splitPath.slice(0, splitPath.length - 1).join("/");
  const absoluteUrl = new URL(excludeFilenamePath, DOCSSITE_URL);

  const relativeImageRegex = /!?\[[^\]]+\]\((?!https|ftp:\/\/)[^\)]+\)/g;
  const imageUrlRegex = /\]\(([^)]+)\)/;

  // 相対画像リンクを絶対URLに変換
  content.match(relativeImageRegex)?.forEach((relativeImage) => {
    if (imageUrlRegex.test(relativeImage)) {
      const url = imageUrlRegex.exec(relativeImage)![1];
      content = content.replace(url, `${absoluteUrl.href}/${url}`);
    }
  });

  const relativeImageTagRegex = /<img src="(?!https|ftp:\/\/)[^"]+"/g;
  const imageSrcRegex = /src="([^"]+)"/;

  // <img>タグの相対src属性を絶対URLに変換
  content.match(relativeImageTagRegex)?.forEach((relativeImageTag) => {
    if (imageSrcRegex.test(relativeImageTag)) {
      const src = imageSrcRegex.exec(relativeImageTag)![1];
      content = content.replace(src, `${absoluteUrl.href}/${src}`);
    }
  });

  return content;
}

// コードブロックにタイトル属性を追加する関数
//
// 例：javascript:filename.jsを検出し変換する
function replaceCodeBlockTitle(content: string): string {
  const codeBlockTitleRegex = /```[a-zA-Z]+:[\w\.]+/g;
  const filenameRegex = /:[\w\.]+/;

  // コードブロックのタイトル部分を変換して、`title`属性を追加
  content.match(codeBlockTitleRegex)?.forEach((codeBlock) => {
    const filename = filenameRegex.exec(codeBlock)![0];
    content = content.replace(filename, ` title="${filename.slice(1)}"`);
  });

  return content;
}
