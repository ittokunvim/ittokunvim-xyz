import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const newsDirectory = path.join(process.cwd(), "src/news");

export type NewsData = {
  title: string;
  date: string;
  contentHtml: string;
}

export function getAllNewsIds() {
  const fileNames = fs.readdirSync(newsDirectory);

  console.log(fileNames);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getNewsData(slug: string): Promise<NewsData> {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const title = matterResult.data.title;
  const date = matterResult.data.date;

  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    title,
    date,
    contentHtml,
  };
}
