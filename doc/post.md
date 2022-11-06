# 記事投稿機能の実装

記事を投稿する機能を実装していくために何をやればいいのかをメモする場所。

以下の手順で進めていきます。

### ルート

- `GET /posts`、記事のリスト。
- `GET /posts/:id`、記事の詳細ページ。
- `GET /posts/create`、記事の新規作成ページ。
- `GET /posts/:id/update`、記事の編集ページ。
- `GET /posts/:id/delete`、記事の削除ページ。
- `POST /posts/create`、記事を新規作成。
- `PATCH /posts/:id/update`、記事を更新。
- `DELETE /posts/:id/delete`、記事を削除。

**手順**

1. `/test/posts.test.js`を作成して、ルートに関するテストを記述する。
2. `/routes/posts.js`を作成して、テストを通るようにする。

### コントローラ

上記のルートと同じ順番でメソッドを書く。

- `post_get_list`、投稿された記事をすべて取得、`/views/posts/list.ejs`にレンダー。
- `post_get_detail`、IDをもとに記事を検索、`/views/posts/detail.ejs`にレンダーし、見つけた記事を渡す。なければ404を返し、`/views/posts/404.ejs`にレンダーする。
- `post_get_create`、`/views/posts/create.ejs`にレンダーする。
- `post_get_update`、IDをもとに記事を検索、`/views/posts/update.ejs`にレンダーし、見つけた記事を渡す。なければ404を返し、`/views/posts/404.ejs`にレンダーする。
- `post_get_delete`、IDをもとに記事を検索、`/views/posts/delete.ejs`にレンダーし、見つけた記事を渡す。なければ404を返し、`/views/posts/404.ejs`にレンダーする。
- `post_post_create`、送られてきた値を検証し、問題がなければ、`/view/posts/detail.ejs`にレンダーする。問題があれば、422を返し、エラーメッセージと共に`views/posts/create.ejs`にレンダーする。
- `post_patch_update`、IDをもとに記事を検索、なければ404を返し、`/views/posts/404.ejs`にレンダーする。次に、送られてきた値を検証し、問題なければ、`views/posts/detail.ejs`にレンダー。問題あれば、422を返し、エラーメッセージとともに`views/posts/update.ejs`にレンダーする。
- `post_delete_delete`、IDをもとに記事を検索、あれば、`views/posts/list.ejs`にレンダーする。なければ404を返し、`/views/posts/404.ejs`にレンダーする。

**手順**

1. `/test/posts.test.js`に、コントローラに関するテストを記述する。主にCRUDがしっかり行われているかなどを見る。
2. `/controllers/postsController.js`を作成し、CRUDを実装する。
3. また、エラーが出ないようにビュー用のHTMLも作成する。

### ビュー

ビューのテストについてはわからないことが多いため、飛ばすかも。seleniumがいい感じかも。とりあえずビューのテストは目視で行う。レスポンシブ対応する予定なのでそれの確認。

- http://localhost:8000/posts
- http://localhost:8000/posts/1
- http://localhost:8000/posts/create
- http://localhost:8000/posts/:id/update
- http://localhost:8000/posts/:id/delete