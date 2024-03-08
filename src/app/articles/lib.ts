import { remark } from "remark";
import remarkHtml from "remark-html";

const markdownSiteUrl = process.env.NEXT_PUBLIC_MARKDOWNSITE_URL;
const publishedJsonUrl = markdownSiteUrl + "/published.json";

type JsonData = {
  slug: string;
  title: string;
  path: string;
};

type ArticleData = {
  title: string;
  contentHtml: string;
};

export async function fetchMarkdownJson(): Promise<JsonData[]> {
  try {
    const response = await fetch(publishedJsonUrl, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticleData(slug: string): Promise<ArticleData | undefined> {
  const articles = await fetchMarkdownJson();
  const article = articles.find((article: JsonData) => article.slug === slug);

  if (article === undefined) {
    return undefined;
  }

  const title = article.title;
  const contentHtml = await getArticleContentHtml(article.path);

  if (contentHtml === "") {
    return undefined;
  }

  return {
    title: title,
    contentHtml: contentHtml,
  };
}

async function getArticleContentHtml(path: string): Promise<string> {
  const absoluteUrl = new URL(path, markdownSiteUrl);
  const content = await fetch(absoluteUrl.href)
    .then((res) => res.text())
    .then((text) => replaceRelativeUrlToAbsoluteUrl(path, text))
    .catch((error) => {
      console.error(error);
      return "";
    });

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

function replaceRelativeUrlToAbsoluteUrl(path: string, content: string): string {
  const splitPath = path.split("/");
  const excludeFilenamePath = splitPath.slice(0, splitPath.length - 1).join("/");
  const absoluteUrl = new URL(excludeFilenamePath, markdownSiteUrl);
  const relativeImageRegex = /!?\[[^\]]+\]\((?!https|ftp:\/\/)[^\)]+\)/g
  const imageUrlRegex = /\]\(([^)]+)\)/

  content.match(relativeImageRegex)?.forEach((relativeImage) => {
    if (imageUrlRegex.test(relativeImage)) {
      const url = imageUrlRegex.exec(relativeImage)![1].replace(/^\.\//, "");
      content = content.replace(url, `${absoluteUrl.href}/${url}`)
    }
  })

  return content;
}
