import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

import Layout from "@/components/layout";
import styles from "@/styles/posts/uid.module.css";
import { PostType } from "@/interfaces/post";

export default function PostDetail({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { uid } = router.query;
  const post: PostType = data;
  const [formData, setFormData] = useState({
    title: post.title, body: post.body,
  });
  const [titleEditing, setTitleEditing] = useState(false);
  const [bodyEditing, setBodyEditing] = useState(false);
  const inputTitle = useRef<HTMLInputElement>(null);
  const divTitle = useRef<HTMLDivElement>(null);
  const textareaBody = useRef<HTMLTextAreaElement>(null);
  const divBody = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.title}>
          {!titleEditing && <h1 className={styles.headline} ref={divTitle}>{post.title}</h1>}
          {titleEditing && <form onSubmit={handleUpdateSubmit}>
            <input type="text" name="title" ref={inputTitle} onChange={handleUpdateFormData} />
            <input type="submit" value="Save" />
            <button type="button" onClick={handleUpdateTitle}>Cancel</button>
          </form>
          }
          {!titleEditing && <button className={styles.editbtn} onClick={handleUpdateTitle}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
          }
        </div>
        <div className={styles.article}>
          <div className={styles.article_control}>
            <div className={styles.article_time}>Posted 2 days ago</div>
            <div className={styles.article_edit}>
              {!bodyEditing && <button className={styles.editbtn} onClick={handleUpdateBody}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
              }
            </div>
          </div>
          {!bodyEditing && <div className={styles.article_body} ref={divBody}>
            {post.body}
          </div>
          }
          {bodyEditing && <form onSubmit={handleUpdateSubmit}>
            <textarea name="body" ref={textareaBody} onChange={handleUpdateFormData} />
            <div className={styles.article_form_btns}>
              <button type="button" onClick={handleUpdateBody}>Cancel</button>
              <input type="submit" value="Update post" />
            </div>
          </form>
          }
        </div>
        <div className={styles.sidebar}>
          <form onSubmit={handleDeleteSubmit}>
            <input type="submit" value="Delete post" />
          </form>
        </div>
      </div>
    </Layout>
  );

  async function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/api/posts/${uid}/update`, { method: "POST", body: JSON.stringify(formData), })
      .then((res) => res.json())
      .then(async (data) => {
        setTitleEditing(false);
        setBodyEditing(false);
        await sleep(10);
        divTitle.current!.textContent = data.title;
        divBody.current!.textContent = data.body;
      })
    console.log("Form submitted:", formData);
  }

  function handleDeleteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!window.confirm("本当に削除してよろしいですか？"))
      return;

    fetch(`/api/posts/${uid}/delete`, { method: "POST" })
      .then(() => router.replace("/posts/list"))
  }

  function handleUpdateFormData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdateTitle() {
    setTitleEditing(!titleEditing);
    if (!titleEditing) {
      await sleep(10);
      inputTitle.current!.value = formData.title;
      inputTitle.current!.focus();
    }
  }

  async function handleUpdateBody() {
    setBodyEditing(!bodyEditing);
    if (!bodyEditing) {
      await sleep(10);
      textareaBody.current!.value = formData.body;
      textareaBody.current!.focus();
    }
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiBaseURL = process.env.API_BASE_URL as string;
  const { uid } = context.params ?? { uid: "" };
  const res = await fetch(`${apiBaseURL}/posts/${uid}`);
  const data = await res.json();

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
