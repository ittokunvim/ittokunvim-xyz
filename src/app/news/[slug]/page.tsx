import type { Metadata } from "next";
import { NewsData, getNewsData } from "../lib";

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const newsData: NewsData = await getNewsData(slug);

  return {
    title: newsData.title,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const newsData: NewsData = await getNewsData(slug);

  return (
    <>
      <div>{newsData.title}</div>
      <div>{newsData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: newsData.contentHtml}} />
    </>
  );
}
