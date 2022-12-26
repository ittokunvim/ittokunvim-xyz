# ルーティングについて

以下のルーティングがあります。

## 記事（Post）

| Method | URL               | Controller  |
| ------ | ----------------- | ----------- |
| GET    | /posts/list       | list        |
| GET    | /posts/:id        | detail      |
| GET    | /posts/create     | create_get  |
| POST   | /posts/create     | create_post |
| GET    | /posts/:id/update | update_get  |
| POST   | /posts/:id/update | update_post |
| POST   | /posts/:id/delete | delete_post |

**POST /posts/create**

記事を作成するメソッド。成功すれば作成した記事の詳細ページにリダイレクト、失敗すればエラーメッセージとともに元のページに戻る。

**POST /posts/:id/update**

記事を更新するメソッド。成功すれば対記事を更新して詳細ページにリダイレクト、失敗すればエラーメッセージとともに元もページに戻る。

**POST /posts/:id/delete**

記事を削除するメソッド。記事を削除したら記事一覧ページにリダイレクトする。

## コメント（Comment）

| Method | URL                                  | Controller  |
| ------ | ------------------------------------ | ----------- |
| POST   | /posts/:id/comments                  | create_post |
| POST   | /posts/:post_id/comments/:comment_id | delete_post |

**POST /posts/:id/comments**

記事に対するコメントを作成するメソッド。成功しても失敗しても記事詳細ページへリダイレクトする。

**POST /posts/:post_id/comments/:comment_id**

記事に対するコメントを削除するメソッド。成功しても失敗しても記事詳細ページへリダイレクトする。

## 検索（Search）

| Method | URL                          | Controller |
| ------ | ---------------------------- | ---------- |
| GET    | /search/result?{q,type,page} | result_get |

**GET /search/result?{q,type,page}**

APIのデータベースに保存されているデータを検索するメソッド。以下のパラメータを使用して検索を行う。

- `q`、検索するキーワードを指定する。複数検索可能。
- `type`、検索するモデルを指定する（`post, comment, user`など）。
- `page`、検索数が20件以上の時に使用する。指定することでページを捲ることが可能。
