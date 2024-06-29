# ittokunvim net

ここは私のサイトのソースコードが置かれているリポジトリです。

## 始める前に

以下のアプリケーションをインストールしておく必要があります。

- [Docker](https://www.docker.com/)

`.env.local`ファイルを作成して環境変数を設定する必要があります。
`.env.example`ファイルを参照しながら`.env.local`ファイルを作成してください。

以下のリストを役に立てつつ環境を整えてみてください。

```bash
# .env.exampleファイルをコピーし、.env.localファイルを作成
cp .env.example .env.local
# プライベートIPアドレスを確認
make echo_ip
```

## 始める

前準備が終えたら次に`Docker`を使用してビルドを行います。

```bash
make build
```

次にサーバーを立ち上げます。

```bash
make up
```

最後に[localhost:3000](http://localhost:3000)にアクセスしてみましょう！
