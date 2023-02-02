// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PostType from '@/interfaces/post'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostData } from '@/lib/post';

type Data = {
  post_count: number
  posts: PostType[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = getPostData();
  res.status(200).json(data)
}
