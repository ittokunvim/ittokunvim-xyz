import toolsJson from "./tools.json";

export type ToolData = {
  slug: string;
  name: string;
  description: string;
  createdAt: string;
};

export function getToolDataAll(): ToolData[] {
  const tools = toolsJson;
  // sort tools by createdAt
  return tools.sort((a: ToolData, b: ToolData) => {
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

export function getToolSlugAll(): string[] {
  return toolsJson.map((tool) => tool.slug);
}
