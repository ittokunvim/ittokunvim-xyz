import { queryToString } from "@/lib/post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Pager from "@/components/ui/pager";

export default function PostList() {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState({
    post_count: 0, posts: [
      { id: 0, title: "", content: "", created_at: "", updated_at: "" }
    ]
  })

  useEffect(() => {
    setLoading(true)
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const query = queryToString(router.query);
    const url = `${apiBaseURL}/posts?${query}`;

    if (router.isReady) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
    }
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <p>Loading ...</p>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <p>No Post data...</p>
      </Layout>
    )
  }

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
        <Pager
          router={router}
          totalCount={data.post_count}
          pageStep={20}
        />
      </div>
    </Layout>
  );
}
