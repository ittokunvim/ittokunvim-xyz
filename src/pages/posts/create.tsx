import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "@/styles/posts/create.module.css";
import Layout from "@/components/layout";

export default function PostCreate() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", body: "",
  })

  return (
    <Layout>
      <Head>
        <title>Post Create</title>
      </Head>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_title}>
            <input type="text" name="title" placeholder="Title" onChange={handleUpdateFormData} />
          </div>
          <div className={styles.form_body}>
            <textarea name="body" placeholder="Leave a post" onChange={handleUpdateFormData} />
          </div>
          <input type="submit" value="Submit new post" />
        </form>
      </div>
    </Layout>
  );

  function handleUpdateFormData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(form)
    });
    const data = await res.json();
    router.push(`/posts/${data.id}`)
  }
}
