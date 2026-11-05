![LOGO](logo.png)

It's longer than a tweet but shorter than your average blog post

## Development

Requires Node 20.9+ (`nvm use` picks up `.nvmrc`).

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm start       # serve out/ locally
```

Pushing to `master` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Writing a post

Add `content/posts/<slug>.mdx`; the slug becomes the URL `/blog/<slug>/`.

````mdx
---
title: "My new crumb"
date: "2026-11-05"
tag: "JS"
color: "#e0708a"
author: "Shehab Elhariry"
authorImage: "/images/authors/shehab-elhariry.jpeg"
previewImage: "/images/posts/<slug>/preview.svg"
socialImage: "/images/posts/<slug>/social.png"
---

Write Markdown as usual. Images go in `public/images/posts/<slug>/`.

```js
const fencedBlocks = "get highlighting and a copy button"
```

<CodeGroup>

```html
<p>Several blocks inside a CodeGroup</p>
```

```css
p {
  color: teal;
}
```

</CodeGroup>
````

Add `draft: true` to the frontmatter to keep a post off the site.
