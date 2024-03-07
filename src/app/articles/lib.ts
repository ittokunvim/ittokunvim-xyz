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
  content: string;
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
  const content = await getArticleContent(article.path);

  if (content === "") {
    return undefined;
  }

  return {
    title: title,
    content: content,
  };
}

async function getArticleContent(path: string): Promise<string> {
  const absoluteUrl = new URL(path, markdownSiteUrl);
  const content = await fetch(absoluteUrl.href)
    .then((res) => res.text())
    .then((text) => convertRelativePathToAbsolutePath(path, text))
    .catch((error) => {
      console.error(error);
      return "";
    });

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

function convertRelativePathToAbsolutePath(path: string, content: string): string {
  const splitPath = path.split("/");
  const relativePath = splitPath.slice(0, splitPath.length - 1).join("/");
  const absoluteUrl = new URL(relativePath, markdownSiteUrl);
  const relativeImageRegex = /!?\[[^\]]+\]\((?!https|ftp:\/\/)[^\)]+\)/g
  const imageUrlRegex = /\]\(([^)]+)\)/
  content.match(relativeImageRegex)?.forEach((imageLink) => {
    if (imageUrlRegex.test(imageLink)) {
      let url = imageUrlRegex.exec(imageLink)![1];
      content = content.replace(url, `${absoluteUrl.href}/${url.replace(/^\.\//, "")}`)
    }
  })
  return content;
}
