import type { NextApiRequest, NextApiResponse } from 'next'

import PostType from "@/interfaces/post"

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<PostType>
) {
  const data = {
    id: "f7c6436a-f346-4066-bee9-57ff9566ef51",
    title: "This is a post title",
    body: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
    created_at: "2023-03-26T10:04:39.445113",
    updated_at: "2023-03-26T10:04:39.445113",
  };
  res.status(200).json(data);
}
