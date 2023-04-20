import type { NextApiRequest, NextApiResponse } from 'next'

import { PostType } from "@/interfaces/post"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType>
) {
  const apiBaseURL = process.env.API_BASE_URL;
  const id = JSON.parse(req.body).id;
  const response = await fetch(`${apiBaseURL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
  const json = await response.json()

  res.status(200).json(json);
}
