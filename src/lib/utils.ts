import toolsJson from './tools.json';

type ToolsData = {
  slug: string;
  name: string;
  description: string;
  createdAt: string;
};

export function fetchToolsJson(): ToolsData[] {
  const tools = toolsJson;
  // sort tools by createdAt
  return tools.sort((a: ToolsData, b: ToolsData) => {
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
