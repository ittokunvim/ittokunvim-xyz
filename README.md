# ittokunvim xyz

`ittokunvim-xyz`はittokunvimが公開しているWebサイトです

## 準備

このプロジェクトを立ち上げるためには`Docker`が必要になります。
以下のURLにアクセスしてインストールしましょう。

[Docker](https://www.docker.com/)

次に環境変数を設定するために、`.env.local`ファイルを作成します。
見本として`.env.example`ファイルを作成しているので、これを参考に変数を設定します。

以下のコマンドを実行するとスムーズに設定することが可能です。

```bash
# .env.exampleファイルをコピーし、.env.localファイルを作成
cp .env.example .env.local
# プライベートIPアドレスを確認
make echo_ip
```

最後に`Docker`でビルドする際に、リポジトリをクローンする処理の時にGitHubのSSHキーが必要になります。

以下にGitHubにSSHキーを設定する方法について書かれているドキュメントのURLを載せていますので、
そちらを参考にしてキーの設定を行うと良いでしょう。

https://zenn.dev/schnell/articles/0e1c2e9db5c08d

https://zenn.dev/ryo_f/articles/27f223203481ef

これで準備は整いました！お疲れ様です！

## プロジェクトを立ち上げる

では`Docker`を使用してビルドをして、サーバーを立ち上げてみましょう！

```bash
# ビルド
make build
# 立ち上げ
make up
```

これでプロジェクトが動作するはずです。以下のURLにアクセスして確認してみましょう！

http://localhost:3000
