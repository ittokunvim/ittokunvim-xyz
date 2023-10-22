import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const newsDirectory = path.join(process.cwd(), "src/news");

type NewsPageData = {
  slug: string;
  title: string;
  timesAgo: string;
};

type NewsData = {
  title: string;
  date: string;
  contentHtml: string;
};

export async function getAllNewsData(): Promise<NewsPageData[]> {
  return await Promise.all(
    getAllNewsIds().map(async (slug) => {
      const data = await getNewsData(slug);
      const title = data.title;
      const timesAgo = getTimesAgo(data.date);

      return { slug, title, timesAgo };
    }),
  );
}

export async function getNewsData(slug: string): Promise<NewsData> {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  const fileContents = getFileContents(fullPath);

  const matterResult = matter(fileContents);
  const title = matterResult.data.title;
  const date = matterResult.data.date;

  const processedContent = await remark().use(remarkHtml).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    title,
    date,
    contentHtml,
  };
}

function getAllNewsIds(): string[] {
  const fileNames = fs.readdirSync(newsDirectory);
  // Remove 404 and test files
  fileNames.splice(fileNames.indexOf("404.md"), 1);
  fileNames.splice(fileNames.indexOf("test.md"), 1);

  const newsIds = fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });

  // Sort news by date
  return newsIds.sort((a, b) => {
    return a > b ? -1 : 1;
  });
}

function getFileContents(fullPath: string): string {
  const notFoundPath = path.join(newsDirectory, "404.md");

  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf8");
  } else {
    return fs.readFileSync(notFoundPath, "utf8");
  }
}

function getTimesAgo(date: string): string {
  const now = new Date(new Date().getTime() + 1000 * 60 * 60 * 9); // JST
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (years > 0) {
    return `${years}年前`;
  } else if (months > 0) {
    return `${months}ヶ月前`;
  } else if (days > 0) {
    return `${days}日前`;
  } else {
    return "今日";
  }
}
