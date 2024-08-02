# Node.jsの公式イメージを使用
FROM node:22.0.0

# 作業ディレクトリを指定
WORKDIR /app

# ホストマシンからコンテナにコピー
COPY . /app/

# 依存関係のインストール
RUN yarn install

# ポート番号の設定
EXPOSE 3000

# アプリケーションの起動
CMD ["yarn", "start"]