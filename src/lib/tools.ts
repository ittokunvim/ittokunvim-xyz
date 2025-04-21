import toolsJson from "@/config/tools.json";

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

export function getToolData(slug: string): ToolData {
  const tools = getToolDataAll();
  const tool = tools.find((tool: ToolData) => tool.slug === slug);
  const toolData: ToolData = {
    slug: "",
    name: "",
    description: "",
    createdAt: "",
  };


  if (tool == undefined) {
    return toolData;
  }

  return tool;
}

export function getToolSlugAll(): string[] {
  return toolsJson.map((tool) => tool.slug);
}
