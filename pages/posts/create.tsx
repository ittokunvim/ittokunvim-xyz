import BackToTopPage from "@/components/backToTopPage";

export default function CreatePost() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/posts";
  return (
    <>
      <form action={url} method="post">
        <ul>
          <li>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title..."
            />
          </li>
          <li>
            <label htmlFor="content">Content:</label>
            <textarea
              name="content"
              placeholder="Content..."
            />
          </li>
          <li>
            <input type="submit" value="Post" />
          </li>
        </ul>
      </form>
    </>
  );
}
