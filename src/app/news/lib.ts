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
  // Remove 404 and test files
  fileNames.splice(fileNames.indexOf("404.md"), 1);
  fileNames.splice(fileNames.indexOf("test.md"), 1);

  return fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });
}

export async function getNewsData(slug: string): Promise<NewsData> {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  const fileContents = getFileContents(fullPath);

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

function getFileContents(fullPath: string): string {
  const notFoundPath = path.join(newsDirectory, "404.md");

  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf8");
  } else {
    return fs.readFileSync(notFoundPath, "utf8")
  }
}
