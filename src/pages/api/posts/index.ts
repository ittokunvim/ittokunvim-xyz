import type { NextApiRequest, NextApiResponse } from 'next'

import PostType from "@/interfaces/post"

type Data = {
  total_count: number,
  posts: PostType[],
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    total_count: 2,
    posts: [
      {
        id: "f7c6436a-f346-4066-bee9-57ff9566ef51",
        title: "This is a post title",
        body: "This is a post body",
        created_at: "2023-03-26T10:04:39.445113",
        updated_at: "2023-03-26T10:04:39.445113",
      },
      {
        id: "07c6436a-f346-4066-bee9-57ff9566ef51",
        title: "Delete me",
        body: "hogebar",
        created_at: "2023-03-26T10:04:39.445113",
        updated_at: "2023-03-26T10:04:39.445113",
      },
    ]
  }
  res.status(200).json(data);
}
