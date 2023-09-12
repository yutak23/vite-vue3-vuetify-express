# vite-vue3-vuetify-express

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## How to develop

### vite devserver and proxy to express

### production mode express

本番モードのサーバーをローカルで立ち上げる手順は以下。

1. `yarn build`
2. `docker compose up -d`
3. `yarn express:run`

Nginxでproxyする理由

- helmetの設定の関係上、HTTPSである必要がある

### config

#### config/default.json

- session.cookie.maxAge: 7 days(7day × 24h × 60m × 60s × 1000ms)

#### .env

- COOKIE_SECRET  
  クッキーのシークレット
- CLIENT_ID_GOOGLE  
  GoogleのクライアントID
- CLIENT_SECRET_GOOGLE  
  Googleのクライアントシークレット
