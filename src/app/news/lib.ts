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

  return fileNames.map((fileName) => {
    if (fileName === "404.md") {
      return;
    }

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
