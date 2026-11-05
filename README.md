![LOGO](logo.png)

It's longer than a tweet but shorter than your average blog post

## Development

Requires Node 20.9+ (`nvm use` picks up `.nvmrc`).

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Pushing to `master` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
