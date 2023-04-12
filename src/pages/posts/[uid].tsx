import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

import Layout from "@/components/layout";
import styles from "@/styles/posts/uid.module.css";

export default function PostDetail() {
  const router = useRouter();
  const [titleEditing, setTitleEditing] = useState(false);
  const [bodyEditing, setBodyEditing] = useState(false);
  const inputTitle = useRef<HTMLInputElement>(null);
  const divTitle = useRef<HTMLDivElement>(null);
  const textareaBody = useRef<HTMLTextAreaElement>(null);
  const divBody = useRef<HTMLDivElement>(null);
  const { uid } = router.query;
  const post = {
    id: "f7c6436a-f346-4066-bee9-57ff9566ef51",
    title: "This is a post title",
    body: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
    created_at: "2023-03-26T10:04:39.445113",
    updated_at: "2023-03-26T10:04:39.445113"
  };

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={styles.title}>
        {!titleEditing && <h1 className={styles.headline} ref={divTitle}>{post.title}</h1>}
        {titleEditing && <form action={`/api/posts/${uid}`} method="post">
          <input type="text" name="title" ref={inputTitle} />
        </form>
        }
        <button className={styles.editbtn} onClick={handleTitleEdit}>
          <FontAwesomeIcon icon={faEdit} />
          Edit
        </button>
      </div>
      <div className={styles.article_wrap}>
        <div className={styles.article}>
          <div className={styles.article_control}>
            <div className={styles.article_time}>Posted 2 days ago</div>
            <div className={styles.article_edit}>
              <button className={styles.editbtn} onClick={handleBodyEdit}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
            </div>
          </div>
          {!bodyEditing && <div className={styles.article_body} ref={divBody}>
            {post.body}
          </div>
          }
          {bodyEditing && <form action={`/api/posts/${uid}`} method="post">
            <textarea name="body" ref={textareaBody} />
          </form>
          }
        </div>
      </div>
    </Layout>
  );

  async function handleTitleEdit() {
    setTitleEditing(!titleEditing);
    if (!titleEditing) {
      let titleText = divTitle.current!.innerText;
      await sleep(10);
      inputTitle.current!.value = titleText;
      inputTitle.current!.focus();
    }
  }

  async function handleBodyEdit() {
    setBodyEditing(!bodyEditing);
    if (!bodyEditing) {
      let bodyText = divBody.current!.innerText;
      await sleep(10);
      textareaBody.current!.value = bodyText;
      textareaBody.current!.focus();
    }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
