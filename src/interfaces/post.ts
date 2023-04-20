export type PostType = {
  id: string,
  title: string,
  body: string,
  created_at: string,
  updated_at: string,
}

export type PostListType = {
  total_count: number,
  posts: PostType[],
}
