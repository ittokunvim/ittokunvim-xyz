import { GetServerSidePropsContext } from "next/types";
import PostType from "@/interfaces/post";
import Layout from "@/components/layout";
import { queryToString } from "@/lib/post";

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
          <ul key={post.id}>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apiBaseURL = process.env.API_BASE_URL;
  const query = queryToString(context.query);
  const url = `${apiBaseURL}/posts?${query}`;

  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 404)
    return { notFound: true }

  return {
    props: { data },
  }
}
