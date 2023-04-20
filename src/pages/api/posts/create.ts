import type { NextApiRequest, NextApiResponse } from 'next'

import { PostType } from "@/interfaces/post"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType>
) {
  const apiBaseURL = process.env.API_BASE_URL as string;
  const resp = await fetch(`${apiBaseURL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: req.body,
  })
  const data = await resp.json();
  res.status(200).json(data);
}
