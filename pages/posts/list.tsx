import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Pager from "@/components/ui/pager";

export default function PostList() {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { asPath } = router
  const [path, query] = asPath.split("?")
  const [data, setData] = useState({
    post_count: 0, posts: [
      { id: 0, title: "", content: "", created_at: "", updated_at: "" }
    ]
  })

  useEffect(() => {
    setLoading(true)
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL
    const url = `${apiBaseURL}/posts?${query || ""}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <p>Loading ...</p>
      </Layout>
    )
  }

  if (data.posts.length === 0) {
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
      </div>
      <Pager
        path={path}
        query={query || ""}
        totalCount={data.post_count}
        perPage={20}
      />
    </Layout>
  );
}
