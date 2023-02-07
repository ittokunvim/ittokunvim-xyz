// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PostType from '@/interfaces/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostData, queryToString } from '@/lib/post';

type Data = {
  post_count: number
  posts: PostType[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const maxDisplayPostCount = 20;
  const pageNumber: number = Number(req.query.page);
  let status = 200;
  let { post_count, posts } = getPostData();

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
