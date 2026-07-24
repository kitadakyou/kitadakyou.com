# kitadakyou.com Astro 移行ガイド

このドキュメントは、現在の Next.js 16 (App Router + MDX) 構成を Astro へ手作業で移行するための手順書です。

**このドキュメントには実装コードを載せていません。** 各ステップで「何を作るか」「そのために Astro のどの機能を使うか」「公式ドキュメントのどこを読むか」だけを示します。コードはご自身で書いてください。

## 前提情報

| 項目 | 値 | 備考 |
|---|---|---|
| Astro | **7.1.3** | 2026-07-24 時点の最新 |
| Node 要件 | `>=22.12.0` | 現在の `.node-version` は 22.14.0 なので**変更不要** |
| パッケージマネージャ | pnpm | 現状維持で問題なし |
| 出典 | `withastro/docs` @ `9d0e415` (2026-07-24) | リンクは英語版に統一しています（下記参照） |

ドキュメントのリンクはすべて英語版 (`/en/`) を指しています。一部のページには日本語訳がありますが、翻訳は英語版に対して追従が遅れることがあり、実際 Content Collections やスタイリングなど今回の中心となるページは未訳です。URL の `/en/` を `/ja/` に変えれば日本語版（未訳の場合は英語版）が表示されます。

Astro 7 は比較的新しいメジャーです。ネット上の記事の多くは Astro 4〜5 world のもので、**特に Markdown 処理まわりは v7 で作りが変わっています**（後述）。情報を探すときは必ずバージョンを確認してください。

まず一度ざっと目を通しておくとよいページ:

- [Next.js からの移行 (en)](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/) — 概念の対応表があります
- [Astro をインストールする (en)](https://docs.astro.build/en/install-and-setup/)
- [プロジェクト構成 (en)](https://docs.astro.build/en/basics/project-structure/)

---

## 最初に理解しておく3つの前提

Astro を書いたことがないとのことなので、ここだけ先に押さえてください。以降の手順が一気に読みやすくなります。

### 1. `.astro` のフロントマター（`---`）はビルド時にしか動かない

`.astro` ファイルは上部の `---` で囲まれた「コードフェンス」と、下部の HTML テンプレートに分かれます。コードフェンスに書いた JavaScript は**ビルド時にサーバーで実行されるだけ**で、ブラウザには一切送られません。React コンポーネントの本体とは別物です。トップレベル `await` がそのまま書けます。

→ [Astro コンポーネント / コンポーネントスクリプト (en)](https://docs.astro.build/en/basics/astro-components/#the-component-script)

### 2. デフォルトで JavaScript は 1 バイトも出荷されない

Astro は既定で全ページを静的 HTML にします。クライアント JS が要る箇所だけ「アイランド」として明示的に有効化する設計です。**このサイトは調査の結果、クライアント JS が必要な箇所が実質ゼロ**なので（唯一の `'use client'` である一覧の行クリックは `<a>` で置き換え可能）、React 自体を導入せずに移行できます。`@astrojs/react` は入れない前提で進めます。

### 3. `src/pages/` がそのまま URL になる

ファイルベースルーティングは Next と同じ発想です。ただし Route Group（`(AppBar)` のような括弧ディレクトリ）は存在しません。レイアウトは「ページごとに import して使うコンポーネント」であり、ディレクトリ構造で暗黙に決まるものではありません。

→ [ページ (en)](https://docs.astro.build/en/basics/astro-pages/) / [レイアウト (en)](https://docs.astro.build/en/basics/layouts/)

---

## 完成形のディレクトリ対応

現状 → 移行後の対応表です。全体像として先に置いておきます。

| 現在 (Next.js) | 移行後 (Astro) |
|---|---|
| `src/app/(AppBar)/layout.tsx` | `src/layouts/Base.astro` |
| `src/app/(AppBar)/myheader.tsx` | `src/components/Header.astro` |
| `src/app/(AppBar)/myFooter.tsx` | `src/components/Footer.astro` |
| `src/app/(AppBar)/(Contents)/page.tsx` | `src/pages/index.astro` |
| `src/app/(AppBar)/(Contents)/contentsTable.tsx` | `src/components/ContentsTable.astro` |
| `src/app/(AppBar)/about/page.tsx` | `src/pages/about.astro` |
| `src/app/(AppBar)/blog/[path]/page.tsx` | `src/pages/blog/[...id].astro` |
| `src/app/(AppBar)/blog/[path]/OtherContentLink.tsx` | `src/components/OtherContentLink.astro` |
| `src/app/(AppBar)/blog/[path]/SnsShareLinks.tsx` | `src/components/SnsShareLinks.astro` |
| `src/app/api/og/blog/[path]/route.tsx` | `src/pages/og/blog/[id].png.ts` |
| `src/app/sitemap.ts` | `@astrojs/sitemap` インテグレーション |
| `src/app/globals.css` | `src/styles/global.css` |
| `src/libs/contents.ts` | **廃止** → 各記事の frontmatter + `src/content.config.ts` |
| `src/articles/*.mdx` | `src/data/blog/*.md` |
| `public/` | `public/`（**変更不要**） |
| `next.config.js` | `astro.config.mjs` |
| `mdx-components.tsx` | 不要（中身が空のため失うものなし） |

---

# Phase 0: 事前準備（まだ Next.js のまま）

Astro を触る前に、**現在のリポジトリで**済ませておくべき作業です。ここを飛ばすと、後で「移行のせいで壊れたのか、元から壊れていたのか」の切り分けができなくなります。

## Step 0-1. `<img>` タグを Markdown 互換に直す

MDX をやめて Markdown にする方針なので、**現在の記事の `<img>` はそのままでは正しく動きません**。実際に Astro 7 が使う Markdown パイプライン（Sätteri 0.9.5）で検証済みの、確実に起きる問題が2つあります。

### (a) `width={450}` は JSX 式なので Markdown では壊れる

**該当9箇所**: `afterwards-of-in-the-rain.mdx` (5)、`singer-songwriter-comedian.mdx` (4)

Markdown では生 HTML としてそのまま出力されるため、ブラウザは `width="{450}"` を無効値として無視します。画像の寸法指定が効かなくなり、レイアウトシフトが起きます。

→ **`width="450"` のようにクォートで囲む形に直してください。**

### (b) `<img>` の直後に空行がないと、次の行が HTML ブロックに飲み込まれる

**該当16箇所**（21個の `<img>` 中）。これが厄介な方です。Markdown の仕様上、`<img ... />` だけの行は HTML ブロックを開始し、**空行が来るまでの全行を生 HTML として扱います**。実測結果:

```
入力:
<img src='/img/a.webp' alt="原稿" ... />
↑原稿。[リンク付き](https://example.com)のキャプション。

Markdown での出力（キャプションが <p> に包まれず、リンク記法も未処理のまま）:
<img src='/img/a.webp' alt="原稿" ... />
↑原稿。[リンク付き](https://example.com)のキャプション。
```

現在の MDX ではキャプション行は独立した `<p>` になり、リンクも `<a>` に変換されています。つまり **md 化するとキャプションの見た目とリンクが壊れます**。`.article p` のマージン指定も当たらなくなります。

16箇所のうち12箇所は次行が全角スペースのみなので実害は軽微ですが、`afterwards-of-in-the-rain.mdx` の4箇所は日本語キャプション行です。

→ **各 `<img>` の直後に空行を1つ入れてください。** 修正後は期待通り `<p>` + `<a>` になることを実測で確認済みです。この修正は `.mdx` のまま入れても無害なので、今のうちにやってしまうのが安全です。

## Step 0-2. 現在の OG 画像を目視確認する

`src/app/api/og/blog/[path]/route.tsx` はフォント指定なしで `@vercel/og` を使っています。**日本語が豆腐（□□□）になっていないか、実際の OG 画像を1枚確認してください。**

- 正常に出ている → 移行後も同じ見た目を再現する必要がある
- 豆腐になっている → 移行は修正のチャンス。Phase 6 で直す

判断が変わるので、先に確認してください。

## Step 0-3. 現在の全 URL とレンダリング結果を控える

移行後に差分を比較するための基準データです。最低限:

- 全ページの URL 一覧（トップ、about、記事19本）
- 一覧ページの**日付表示**と**並び順**のスクリーンショット
- 記事1〜2本のスクリーンショット（特に改行の入り方）

理由は Phase 3 と Phase 5 の注意書きで説明します。

## Step 0-4. 下書きファイルの扱いを決める

`src/articles/my-new-dental-clinic` は**拡張子がなく、`contents.ts` にも未登録**です。結果として今は非公開の下書きになっています。

Astro では glob パターンで記事を集めるので、この曖昧な状態は持ち込めません。「公開する」「`.md` を付けて下書きフラグを立てる」「リポジトリから外す」のいずれかを決めてください。

---

# Phase 1: 土台を作る

## Step 1. Astro プロジェクトを作る

`pnpm create astro@latest` で CLI ウィザードを起動します。**空（Empty）のテンプレート**を選んでください。ブログテンプレートを選ぶと既存の設計と混ざって、かえって読み解く手間が増えます。

→ [インストールとセットアップ (en)](https://docs.astro.build/en/install-and-setup/)

現リポジトリとの合流方法は2通りあります。

1. **別ディレクトリで作って、後から中身を移す**（おすすめ）。Next.js 版をいつでも起動して見比べられます。
2. その場で上書きしていく。差分は綺麗ですが、途中でサイトが動かない期間が生まれます。

`public/` は **Next と Astro で役割が同一なので、そのままコピーするだけ**です。中身の変更は要りません。

→ [プロジェクト構成 (en)](https://docs.astro.build/en/basics/project-structure/)

**確認**: `pnpm dev` が起動し、初期ページがブラウザで表示されること。

## Step 2. `astro.config.mjs` に `site` を設定する

`site` にサイトの本番 URL（`https://kitadakyou.com`）を設定します。これは後で **sitemap と OG 画像の絶対 URL 生成の両方に必須**になるので、最初に入れておきます。

→ [Astro の設定 (en)](https://docs.astro.build/en/guides/configuring-astro/) / [設定リファレンス `site` (en)](https://docs.astro.build/en/reference/configuration-reference/#site)

## Step 3. インポートエイリアスを設定する

現在 `libs/contents` のようなベア指定で import できているのは tsconfig の `baseUrl: "src"` のおかげですが、Astro では **`paths`** を使うのが正攻法です。

→ [エイリアス (en)](https://docs.astro.build/en/guides/imports/#aliases)

**確認**: この時点ではまだ何も表示されなくて構いません。`pnpm build` が通ればOK。

---

# Phase 2: 最初の1ページを作る（`/about`）

## なぜ about から始めるのか

`/about` は**データも Markdown も動的ルーティングも使わない、純粋な HTML + CSS のページ**です。ここで Astro の基本3点（ページ / レイアウト / スタイル）だけを、他の複雑さ抜きで習得できます。ここが動けば、残りは「その上に何を載せるか」の話になります。

いきなり記事ページから作ると、Content Collections と動的ルーティングと Markdown レンダリングを同時に相手にすることになるので、詰まったときに原因が絞れません。

## Step 4. `src/pages/about.astro` を作る

`src/app/(AppBar)/about/page.tsx` の JSX を土台に、Astro 構文へ書き換えます。主な置換:

| Next / JSX | Astro |
|---|---|
| `className=` | `class=` |
| `<Link href="...">` | `<a href="...">` |
| `<Image src="..." width={25} height={25} />` | `<img src="..." width="25" height="25">` |
| `style={{ fontWeight: "bold" }}` | `style="font-weight: bold;"` |
| `{/* コメント */}` | `<!-- コメント -->` |
| `export const metadata` | レイアウトに `<title>` 等を渡す（Step 5） |

`next/image` は不要です。このサイトの画像は**すべて `public/` 配下の固定サイズ画像**であり、`public/` の画像は Astro でも最適化対象外なので、素の `<img>` が正解です。

→ [`src/` と `public/` の違い (en)](https://docs.astro.build/en/guides/images/#src-vs-public) / [Astro と JSX の違い (en)](https://docs.astro.build/en/reference/astro-syntax/#differences-between-astro-and-jsx)

**なお `about/page.tsx` に残っている `next/head` の `<Head>` は App Router では無効な死にコードです。移行時に持ち込まないでください。**（`(Contents)/page.tsx` にも同じものがあります）

## Step 5. レイアウトとヘッダー / フッターを作る

`(AppBar)/layout.tsx` が持っていた `<html>` / `<head>` / `<body>` と、ヘッダー・フッターの配置を `src/layouts/Base.astro` に移します。ページ側の中身は `<slot />` で受け取ります。

ページ固有のタイトルや OG 情報は `Astro.props` でレイアウトに渡す設計にしてください。Next の `export const metadata` に相当する仕組みは Astro にはなく、**`<head>` の中身は自分で書きます**。

→ [レイアウト (en)](https://docs.astro.build/en/basics/layouts/) / [スロット (en)](https://docs.astro.build/en/basics/astro-components/#slots) / [`Astro.props` (en)](https://docs.astro.build/en/reference/api-reference/#props)

## Step 6. CSS を移す

`src/app/globals.css` を `src/styles/global.css` に置き、レイアウトから import します。CSS 変数（`--color-*`）はそのまま使えます。

Astro の `<style>` はデフォルトでそのコンポーネントにスコープされます。CSS Modules も引き続き使えますが、`.astro` ファイル内では `<style>` を使うのが自然です。

→ [スタイリング (en)](https://docs.astro.build/en/guides/styling/#styling-in-astro) / [グローバルスタイル (en)](https://docs.astro.build/en/guides/styling/#global-styles) / [CSS Modules (en)](https://docs.astro.build/en/guides/imports/#css-modules)

**確認**: `/about` が現行サイトとピクセル単位で同じに見えること。ヘッダー・フッターも含めて完成させてください。ここが Phase 4 以降の土台になります。

---

# Phase 3: 記事データを Content Collections に載せる

ここが移行の山場のひとつです。`src/libs/contents.ts` の手書き配列を廃止し、Astro 標準のコンテンツ管理に移します。

## Step 7. 19記事に frontmatter を付ける

現在の記事には frontmatter が1つもありません。`contents.ts` の各エントリを、対応する記事ファイルの先頭に移してください。必要な項目は `title` / `date` / `genre` の3つです。

同時に:

- ファイルを `src/data/blog/` へ移動し、拡張子を `.md` に変更
- 本文先頭の `# タイトル` をどう扱うか決める（frontmatter の `title` と二重管理になっています。記事ページ側で `<h1>` を出力し、本文からは削除するのが定石です）

### ⚠️ 日付の書式に注意

現在の `contents.ts` は日付の書式が混在しています。

- `new Date('2026-01-05')` … ISO 形式 → **UTC** として解釈
- `new Date('2024-9-30')` … 非 ISO 形式 → **ローカルタイム**として解釈

frontmatter の YAML に書くと解釈が統一されるため、**表示日が1日ずれる記事が出る可能性があります**。Step 0-3 で控えた一覧のスクリーンショットと必ず突き合わせてください。

## Step 8. `src/content.config.ts` を書く

コレクションの定義ファイルです。必要なのは2つ:

- **`glob()` ローダー**（`astro/loaders` から import）— `src/data/blog/` の `.md` を集める
- **`schema`**（`astro/zod` の `z` を使用）— `title` / `date` / `genre` の型を宣言

`genre` は `'blog' | 'novel' | 'music' | 'article'` の4値に限られるので、Zod の enum で縛ると、タイポがビルド時に検出されるようになります。日付は `z.coerce.date()` が定石です。

→ [Content Collections (en)](https://docs.astro.build/en/guides/content-collections/) / [`glob()` ローダー (en)](https://docs.astro.build/en/guides/content-collections/#the-glob-loader) / [スキーマの定義 (en)](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-schema) / [Zod リファレンス (en)](https://docs.astro.build/en/reference/modules/astro-zod/)

**確認**: `pnpm astro sync` を実行してエラーが出ないこと。スキーマ違反があればここで全部落ちます（これは良いことです）。frontmatter の付け忘れや書式ミスを、ページを作る前に洗い出せます。

---

# Phase 4: 一覧ページ（`/`）

## Step 9. `src/pages/index.astro` で記事一覧を出す

`getCollection('blog')` で全記事を取得し、日付の降順に並べてテーブルを描画します。データ取得はコードフェンス内でトップレベル `await` で書けます。

→ [コレクションのクエリ (en)](https://docs.astro.build/en/guides/content-collections/#querying-build-time-collections) / [`getCollection()` リファレンス (en)](https://docs.astro.build/en/reference/modules/astro-content/#getcollection)

### ⚠️ 並び順が変わる可能性

現在の「前の記事 / 次の記事」ナビは `contents.ts` の**配列の並び順**をそのまま使っています（`getPathByIndex(currentIndex ± 1)`）。日付ソートに切り替えると、**同日付の記事や、日付と配列順が食い違っている箇所で並びが変わります**。Step 0-3 のスクリーンショットと突き合わせてください。

## Step 10. 行クリックを `<a>` に置き換える

`contentsTable.tsx` の `'use client'` + `useRouter().push()` は、このサイト唯一のクライアント JS です。`<tr>` の中を `<a>` にすれば同じ挙動を JS ゼロで実現できます。

これによって:

- React / `@astrojs/react` が完全に不要になる
- キーボード操作と「新しいタブで開く」が効くようになる（アクセシビリティの改善）

`genreMenu.tsx` と `genreButton.tsx` は index からコメントアウトされていて**未使用**です。移行対象から外すことを推奨します。

**確認**: トップページの表示が現行と一致すること。日付・並び順・ジャンルの色を確認。

---

# Phase 5: 記事ページ（`/blog/[...id]`）

## Step 11. 動的ルーティングで19ページを生成する

`src/pages/blog/[...id].astro` を作り、`getStaticPaths()` を export します。この中で `getCollection('blog')` を呼び、各記事の `id` を params に、記事エントリそのものを props に渡します。

本文の描画には `astro:content` の **`render()`** を使い、返ってくる `<Content />` コンポーネントをテンプレートに置きます。

→ [コンテンツからルートを生成する (en)](https://docs.astro.build/en/guides/content-collections/#building-for-static-output-default) / [`getStaticPaths()` (en)](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths) / [`render()` (en)](https://docs.astro.build/en/reference/modules/astro-content/#render) / [動的ルーティング (en)](https://docs.astro.build/en/guides/routing/#dynamic-routes)

現在の実装は未知の slug で `return null`（空ページ）を返していますが、静的生成に変えると存在しない URL は素直に 404 になります。改善です。

## Step 12. 【最重要】Markdown 出力にスタイルを当てる

**ここが移行で最も壊れやすい箇所です。**

`blog/[path]/styles.module.css` の以下のセレクタは、**Markdown が生成する要素**を子孫セレクタで狙っています。

```
.article p / h1 / h2 / h3 / h4 / a / pre / blockquote
.article { white-space: pre-line }
```

Astro の `<style>` はデフォルトでスコープされ、**`<Content />` が吐き出した子要素には当たりません**。何もしないと記事本文のタイポグラフィが丸ごと崩れます。

対処は2通りです。

1. `<style>` 内で **`:global()`** を使う（例: `.article :global(p) { ... }`）— 推奨
2. CSS Modules のまま持ち込む

→ [グローバルスタイルと `:global()` (en)](https://docs.astro.build/en/guides/styling/#global-styles)

### `white-space: pre-line` は維持されます（検証済み）

このサイトは本文の改行を `white-space: pre-line` で見せる設計です。Astro 7 の Markdown パイプラインで実測したところ、**段落内の単一改行は `\n` として保持される**ことを確認しました。現在と同じ見え方になります。

```
入力: 3行の日本語テキスト（段落内で改行）
出力: <p>最近また、…。\n気が付くと…。\n折角なので<strong>テレビ</strong>…。</p>
```

### ⚠️ ただし `compressHTML` の新デフォルトに注意

Astro **v7 で `compressHTML` のデフォルトが `true` から `'jsx'` に変わりました**。要素間の空白が JSX のルールで削られます。空白に依存した表示をしているこのサイトでは、目視確認を必ず行ってください。挙動が変わっていたら `compressHTML: true`（v6 の挙動）または `false`（全空白を保持）に設定できます。

→ [v7 アップグレードガイド: 新しいデフォルトの空白処理 (en)](https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-whitespace-handling-compresshtml-jsx) / [`compressHTML` (en)](https://docs.astro.build/en/reference/configuration-reference/#compresshtml)

## Step 13. 前後記事ナビと SNS シェアリンク

`OtherContentLink.tsx` / `SnsShareLinks.tsx` を `.astro` に移します。ロジックはそのままですが、記事の順序取得は Step 9 と同じ「日付ソート済み配列」を基準にしてください。共通化しておくと一覧とズレません。

## Step 14. Markdown の処理系設定を確認する

**ここは Astro 7 で作りが変わった部分です。**

v7 から、Markdown のデフォルト処理系が remark/rehype ではなく **Sätteri** という独自パイプラインになりました。`@astrojs/markdown-remark` はデフォルトでは入りません。

- **プラグインを使っていないなら、何もしなくてよい**（このサイトが該当）。GFM と SmartyPants は従来通り適用されます。
- 挙動を変えたい場合は `markdown.processor` に `satteri({ features: { ... } })` を渡します。
- **`markdown.gfm` / `markdown.smartypants` オプションは v7 で非推奨です。** 古い記事のこの書き方は真似しないでください。

→ [Markdown プラグイン (en)](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins) / [Markdown プロセッサの選択 (en)](https://docs.astro.build/en/guides/markdown-content/#choosing-a-markdown-processor) / [v7: 新しいデフォルトの Markdown プロセッサー (en)](https://docs.astro.build/en/guides/upgrade-to/v7/#breaking-changes)

SmartyPants は既定で有効なので、`--` や `...` や引用符が変換される可能性があります。**移行後、記号を含む記事を目視確認してください。**

**確認**: 記事19本すべてを開き、特に画像を含む4本（`afterwards-of-in-the-rain`、`singer-songwriter-comedian`、`chatgpt-described-pasta-that-does-not-exist`、`80s-jrpg-hero-...`）のキャプションと画像サイズを重点的にチェック。

---

# Phase 6: OG 画像

19枚をビルド時に静的生成します。実行時の画像生成は不要です。

## Step 15. 日本語フォントを設定する

**OG 画像の作業量の本体は枚数ではなくフォントです。** satori は日本語グリフを持つフォントを明示的に渡さないと豆腐になります。

Astro には**フォント API** があり、これが最短経路です。設定した フォントのファイルを、`fontData` と `experimental_getFontFileURL()` でプログラムから取得できます。

→ [フォント (en)](https://docs.astro.build/en/guides/fonts/) / [Fontsource プロバイダを使う (en)](https://docs.astro.build/en/guides/fonts/#using-fontsource) / [ローカルフォントファイルを使う (en)](https://docs.astro.build/en/guides/fonts/#using-a-local-font-file)

**公式ドキュメントに、satori で OG 画像を生成する例がそのまま載っています。** ここが出発点として最適です。

→ [フォントデータにプログラムからアクセスする (en)](https://docs.astro.build/en/guides/fonts/#accessing-font-data-programmatically) / [`fontData` (en)](https://docs.astro.build/en/reference/modules/astro-assets/#fontdata) / [`experimental_getFontFileURL()` (en)](https://docs.astro.build/en/reference/modules/astro-assets/#experimental_getfontfileurl)

注意点:

- **satori は可変フォントの woff2 を扱えません。** static な TTF/OTF を指定してください（例: Noto Sans JP）。
- 日本語フォントはファイルサイズが大きいですが、**ビルド時のみのコスト**なので実行時の影響はゼロです。

## Step 16. 静的ファイルエンドポイントを作る

`src/pages/og/blog/[id].png.ts` のように、**拡張子付きのファイル名**でエンドポイントを作ります。`getStaticPaths()` を export すれば、ページと同じ要領で19枚分がビルド時に生成されます。`GET` 関数から画像バイナリを `Response` で返します。

→ [静的ファイルエンドポイント (en)](https://docs.astro.build/en/guides/endpoints/#static-file-endpoints) / [`params` と動的ルーティング (en)](https://docs.astro.build/en/guides/endpoints/#params-and-dynamic-routing)

現在の実装が `request.url.split('/').pop()` で slug を取り出している箇所は、**`params` から素直に受け取る形**に書き直せます。

また、現在 `route.tsx` の `GENRE_COLORS` は `globals.css` の CSS 変数と二重管理になっています（コメントにも「global.css から変数を読み込めないため」とある通り）。ここを触るついでに整理できます。

## Step 17. OG 画像の URL を絶対 URL にする

**現状のバグです。** `metadataBase` が未設定のまま `openGraph.images` に `/api/og/blog/${slug}` という**相対パス**を渡しています。OGP の画像 URL は絶対 URL でなければならないため、クローラが拾えていない可能性があります。

Step 2 で設定した `site` を使って絶対 URL を組み立ててください。

**確認**: ビルド後 `dist/og/blog/` に19枚の PNG が出力されていること。1枚開いて日本語が正しく描画されていること。

---

# Phase 7: サイト全体の仕上げ

## Step 18. サイトマップ

`@astrojs/sitemap` インテグレーションを入れます。Step 2 の `site` 設定が前提です。

→ [`@astrojs/sitemap` (en)](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

**これにより既存のバグが自動的に解消します。** 現在の `src/app/sitemap.ts:6` は `` `https://kitadakyou.com/blog${content.path}` `` となっており、`content.path` が既に `/blog/...` で始まっているため、`/blog/blog/xxx` という壊れた URL を出力しています。

## Step 19. `robots.txt` / favicon

どちらも `public/` に置いたままで動きます。**作業不要**です。`robots.txt` 内の Sitemap URL も変わりません。

## Step 20. メタタグ

各ページの `<title>` / `<meta>` / OGP タグをレイアウトで組み立てます。Next の `metadata` API に相当するものはないので、props で受けて `<head>` に出力する素朴な作りにします（Step 5 で作った土台をここで完成させます）。

---

# Phase 8: デプロイと撤収

## Step 21. 静的サイトとしてビルドする

動的な要素は OG 画像だけで、それも Phase 6 でビルド時生成にしたため、**全ページ静的化できます**。Astro のデフォルトが静的出力なので、追加設定は基本的に不要です。SSR アダプタも要りません。

→ [Vercel へのデプロイ (en)](https://docs.astro.build/en/guides/deploy/vercel/)

現在の `export const runtime = 'edge'` に相当する設定は不要になります（Astro では実行環境はアダプタ単位の概念で、静的出力では登場しません）。

## Step 22. Next.js の残骸を撤去する

- `package.json` から `next` / `react` / `react-dom` / `@next/mdx` / `@mdx-js/*` / `@vercel/og` / `@types/react*` を削除
- `next.config.js` / `next-env.d.ts` / `mdx-components.tsx` を削除
- `src/libs/contents.ts` を削除（Phase 3 で役目を終えています）
- `tsconfig.json` から Next 用のプラグインと `include` の残骸を整理

## Step 23. ESLint を入れ替える

現在の構成は `eslint-config-next` に依存しているため、そのままでは動きません。`eslint-plugin-astro` / `astro-eslint-parser` に置き換えます。

`@stylistic` の既存ルール（`export default function Page ()` のような関数名の後のスペースなど）は維持できます。

→ [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/)

---

# 移行後チェックリスト

Step 0-3 で控えた基準データと突き合わせてください。

- [ ] URL が全て一致する（トップ / about / 記事19本）。特に `/blog/...` の階層が変わっていないこと
- [ ] 一覧の**日付表示**が1日もずれていない（Phase 3 の日付解釈の件）
- [ ] 一覧の**並び順**が変わっていない（Phase 4 の配列順の件）
- [ ] 記事本文の**改行**が現行と同じに見える（`white-space: pre-line`）
- [ ] 記事本文の**見出し・引用・リンク**にスタイルが当たっている（Step 12 の `:global()` の件）
- [ ] 画像のキャプションが `<p>` として表示され、リンクが機能している（Step 0-1 の件）
- [ ] 画像の表示サイズが変わっていない（`width={450}` → `width="450"` の件）
- [ ] SmartyPants による記号の変換が許容範囲か
- [ ] 要素間の空白が消えていない（`compressHTML: 'jsx'` の件）
- [ ] OG 画像19枚が生成され、日本語が読める
- [ ] OGP の画像 URL が**絶対 URL** になっている
- [ ] `sitemap.xml` の URL が `/blog/blog/...` になっていない
- [ ] クライアント JS が出力されていない（ビルド結果に JS バンドルが無いこと）

---

# 参考リンク一覧

## 全体
- [Next.js からの移行 (en)](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)
- [インストールとセットアップ (en)](https://docs.astro.build/en/install-and-setup/)
- [プロジェクト構成 (en)](https://docs.astro.build/en/basics/project-structure/)
- [設定リファレンス (en)](https://docs.astro.build/en/reference/configuration-reference/)
- [v7 アップグレードガイド (en)](https://docs.astro.build/en/guides/upgrade-to/v7/)

## 基本構文
- [Astro コンポーネント (en)](https://docs.astro.build/en/basics/astro-components/)
- [ページ (en)](https://docs.astro.build/en/basics/astro-pages/)
- [レイアウト (en)](https://docs.astro.build/en/basics/layouts/)
- [Astro 構文リファレンス (en)](https://docs.astro.build/en/reference/astro-syntax/)
- [API リファレンス (en)](https://docs.astro.build/en/reference/api-reference/)

## コンテンツ
- [Content Collections (en)](https://docs.astro.build/en/guides/content-collections/)
- [`astro:content` モジュール (en)](https://docs.astro.build/en/reference/modules/astro-content/)
- [Zod リファレンス (en)](https://docs.astro.build/en/reference/modules/astro-zod/)
- [Markdown (en)](https://docs.astro.build/en/guides/markdown-content/)

## ルーティング
- [ルーティング (en)](https://docs.astro.build/en/guides/routing/)
- [ルーティングリファレンス / `getStaticPaths()` (en)](https://docs.astro.build/en/reference/routing-reference/#getstaticpaths)
- [エンドポイント (en)](https://docs.astro.build/en/guides/endpoints/)

## スタイル・アセット
- [スタイリング (en)](https://docs.astro.build/en/guides/styling/)
- [画像 (en)](https://docs.astro.build/en/guides/images/)
- [フォント (en)](https://docs.astro.build/en/guides/fonts/)
- [`astro:assets` モジュール (en)](https://docs.astro.build/en/reference/modules/astro-assets/)
- [インポート / エイリアス (en)](https://docs.astro.build/en/guides/imports/)

## デプロイ
- [Vercel へのデプロイ (en)](https://docs.astro.build/en/guides/deploy/vercel/)
- [`@astrojs/sitemap` (en)](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
