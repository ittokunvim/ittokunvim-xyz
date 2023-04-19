import type { NextApiRequest, NextApiResponse } from 'next'

import { PostType } from "@/interfaces/post"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType>
) {
  const id = req.query.uid as string;
  const { title, body } = JSON.parse(req.body);
  const created_at = getNowDateString(), updated_at = created_at;
  const data = {
    id,
    title,
    body,
    created_at,
    updated_at,
  }

  console.log(data);

  res.status(200).json(data);
}

function getNowDateString(): string {
  const now = new Date();
  return now.toISOString(); // "2023-03-26T10:04:39.445Z"
}
