import newsJson from './news.json';

export type NewsData = {
  contents: string[];
  createdAt: string;
};

export function getNewsListAll(): NewsData[] {
  const news = newsJson;
  // sort news by createdAt
  return news.sort((a: NewsData, b: NewsData) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

