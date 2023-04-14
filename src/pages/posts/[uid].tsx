import Head from "next/head";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

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
  const [post, setPost] = useState({
    id: "", title: "", body: "", created_at: "", updated_at: "",
  })

  useEffect(() => {
    fetch(`/api/posts/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
  }, [])

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.title}>
          {!titleEditing && <h1 className={styles.headline} ref={divTitle}>{post.title}</h1>}
          {titleEditing && <form action={`/api/posts/${uid}/update`} method="post">
            <input type="text" name="title" ref={inputTitle} />
            <input type="submit" value="Save" />
            <button type="button" onClick={handleTitleEdit}>Cancel</button>
          </form>
          }
          {!titleEditing && <button className={styles.editbtn} onClick={handleTitleEdit}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
          }
        </div>
        <div className={styles.article}>
          <div className={styles.article_control}>
            <div className={styles.article_time}>Posted 2 days ago</div>
            <div className={styles.article_edit}>
              {!bodyEditing && <button className={styles.editbtn} onClick={handleBodyEdit}>
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
          {bodyEditing && <form action={`/api/posts/${uid}/update`} method="post">
            <textarea name="body" ref={textareaBody} />
            <div className={styles.article_form_btns}>
              <button type="button" onClick={handleBodyEdit}>Cancel</button>
              <input type="submit" value="Update post" />
            </div>
          </form>
          }
        </div>
        <div className={styles.sidebar}>
          <form action={`/api/posts/${uid}/delete`} method="post">
            <input type="submit" value="Delete post" onClick={confirmDelete} />
          </form>
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

function confirmDelete(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
  (window.confirm("本当に削除してよろしいですか？"))
    ? "Delete"
    : e.preventDefault();
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
