const publishedJsonUrl = process.env.NEXT_PUBLIC_MARKDOWNSITE_URL + "/published.json";

export type MarkdownData = {
  title: string;
  path: string;
};

export async function getAllArticleData(): Promise<MarkdownData[]> {
  try {
    const response = await fetch(publishedJsonUrl, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
