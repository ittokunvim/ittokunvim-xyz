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
    .catch((error) => {
      console.error(error);
      return "";
    });

  const processedContent = await remark().use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}
