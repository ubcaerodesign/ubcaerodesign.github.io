# React + TypeScript on GitHub Pages (Vite)

A react website that deploys to GitHub Pages using **GitHub Actions**.
- ⚡ Vite + React + TypeScript
- 🔁 `BrowserRouter` (404 page added for SPA fallback trick)
- 🚀 Zero-config CI deploy (this repo already contains the workflow)

---

## 1) Run locally

**Requirements:** Node.js 20+ (LTS). On Windows, install from https://nodejs.org and accept the option to add Node to PATH.

```bash
npm install
npm run dev
```

## 2) Create a GitHub repo and push

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USER_OR_ORG>/<YOUR_REPO>.git
git push -u origin main
```

## 3) Enable Pages (no extra config)

- Open your repo → **Settings → Pages**.
- Under **Build and deployment**, set **Source: GitHub Actions** (the included workflow handles everything).
- Push to `main` anytime to redeploy.

### How it works
The workflow builds with a `BASE_PATH` that matches your repo name so Vite emits correct asset URLs.
- If your repo is **`<user>.github.io`** (user/organization site), it uses `/`.
- Otherwise (project site), it uses `/<repo>/`.

## 4) Custom domain (optional)

- In **Settings → Pages**, set your custom domain (e.g., `www.example.com`).
- Create a `CNAME` DNS record pointing to `<user>.github.io` (or your org).
- (Optional) Add a `public/CNAME` file containing your domain so the Action publishes it automatically.

---

## Add more pages

- Create `src/pages/YourPage.tsx`
- Add a `<Route path="/your-page" element={<YourPage/>} />` in `src/App.tsx`
- Add a link in `src/components/NavBar.tsx`

---

## Troubleshooting

- **"Could not determine Node.js install directory" (Windows):**
  Reinstall Node.js LTS and ensure "Add to PATH" is checked. Then re-open your terminal.
- **ESLint 'react-app' config error:** This starter doesn't use CRA's ESLint preset. If you see this,
  you probably have leftover files from Create React App; start from a clean folder.
- **Blank page after deploy:** Make sure Pages is set to **GitHub Actions**, and the action completed successfully
  (check the Actions tab). Also confirm that assets load from `/<repo>/...` when it's a project site.

---

## Scripts

```bash
npm run dev     # start dev server
npm run build   # build to dist/
npm run preview # local preview of the production build
```
