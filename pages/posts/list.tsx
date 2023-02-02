import { GetServerSidePropsContext } from "next/types";
import PostType from "@/interfaces/post";
import Layout from "@/components/layout";

type Props = {
  data: {
    post_count: number
    posts: PostType[]
  }
}

export default function PostList({ data }: Props) {
  return (
    <Layout>
      <p>{data.post_count}</p>
      <div>
        {data.posts.map((post) => (
          <ul>
            <li>{post.id}</li>
            <li>{post.title}</li>
            <li>{post.content}</li>
            <li>{post.created_at}</li>
            <li>{post.updated_at}</li>
          </ul>
        ))}
      </div>
    </Layout>
  );
}

/** URLクエリを以下の文字列に変換する
 * { key: "value" } => "key=value"
 * { key1: 'value1', key2: 'value2' } => "key1=value1&key2=value2"
 * {} => ""
 */
function queryToString(obj: any) {
  return Object.entries(obj)
    .map(entry => entry.join("="))
    .join("&");
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apiBaseURL = process.env.API_BASE_URL;
  const query = queryToString(context.query);
  const url = `${apiBaseURL}/posts?${query}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: { data },
  }
}
