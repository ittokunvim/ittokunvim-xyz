// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PostType from '@/interfaces/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import data from "@/lib/posts.json"
import { queryToString } from '@/lib/post'

type Data = {
  post_count: number
  posts: PostType[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | PostType>) {
  switch (req.method) {
    case "GET":
      getAction(req, res);
      break;
    case "POST":
      postAction(req, res);
      break;
  }
}

function getAction(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "production") {
    const url = `${process.env.API_BASE_URL}/posts?${queryToString(req.query)}`
    let status = 200

    fetch(url)
      .then(res => {
        status = res.status
        return (status === 404)
          ? { post_count: 0, posts: [] }
          : res.json()
      })
      .then(data => res.status(status).json(data))
  }

  if (process.env.NODE_ENV === "development") {
    const maxDisplayPostCount = 20;
    const pageNumber: number = Number(req.query.page);
    let status = 200;
    let { post_count, posts } = data;

    // もし、pageクエリ指定があったら
    if (pageNumber && pageNumber > 0) {
      const n = (pageNumber - 1) * maxDisplayPostCount;
      posts = posts.slice(n, n + 20);
    } else {
      posts = posts.slice(0, 19);
    }

    if (posts.length <= 0)
    status = 404;

    res.status(status).json({
      post_count,
      posts,
    })
  }
}

function postAction(req: NextApiRequest, res: NextApiResponse<PostType>) {
  const { title, content } = req.body;
  res.status(200).json({
    id: 9999,
    title,
    content,
    created_at: "2023-02-03TI13:35:28.271Z",
    updated_at: "2023-02-03TI13:35:28.271Z",
  })
}
