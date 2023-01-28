import Layout from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <p>/pages/index.tsx</p>
      <p>Routes</p>
      <ul>
        <li>
          <Link href={"/posts/list"}>
            Post List
          </Link>
        </li>
        <li>
          <Link href={"/posts/hogebar"}>
            Post Detail
          </Link>
        </li>

        <li>
          <Link href={"/posts/create"}>
            Post Create
          </Link>
        </li>

        <li>
          <Link href={"/posts/update"}>
            Post Update
          </Link>
        </li>

        <li>
          <Link href={"/search/result"}>
            Search Result
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
