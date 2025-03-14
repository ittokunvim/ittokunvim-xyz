import newsJson from './news.json';

type NewsData = {
  contents: string[];
  createdAt: string;
};

export function fetchNewsJson(): NewsData[] {
  const news = newsJson;
  // sort news by createdAt
  return news.sort((a: NewsData, b: NewsData) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

export function formatDate(createdAt: string): string {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}
