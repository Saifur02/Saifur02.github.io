# Md. Saifur Rahman — Research Portfolio

Interactive, single-page research portfolio built as a static site: **React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**. No backend, no database, no paid hosting — it deploys free on GitHub Pages.

All content comes from `CV_of_Md_Saifur_Rahman.pdf` and lives in typed data files under [src/data/](src/data/). Edit those files to update the site; the components read from them.

---

## Deploy to GitHub Pages

Account: **Saifur02**. Site URL: **<https://saifur02.github.io/>**

### 1. Create the repository

Create a **new public repository** named exactly:

```
Saifur02.github.io
```

The name must match the account name, or GitHub will not serve the site at the domain root. Do **not** add a README, `.gitignore` or licence — this project already has them.

### 2. Push the code

From the project folder:

```bash
git init
git add .
git commit -m "Add research portfolio"
git branch -M main
git remote add origin https://github.com/Saifur02/Saifur02.github.io.git
git push -u origin main
```

If git has never been used on this machine, set an identity first:

```bash
git config --global user.name "Md. Saifur Rahman"
git config --global user.email "saifurrahman02041@gmail.com"
```

### 3. Turn on Pages with GitHub Actions

In the repository: **Settings → Pages → Build and deployment → Source** → select **GitHub Actions**.

That is the whole setup. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) installs dependencies, builds, and publishes `dist/` on every push to `main`. Watch it under the **Actions** tab; the first run takes about a minute.

### 4. Visit the site

```
https://saifur02.github.io/
```

---

## Deploying to a project repository instead

If you would rather host at `https://saifur02.github.io/portfolio/`, name the repository `portfolio` and set the base path in the build step of [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

```yaml
      - name: Build
        run: npm run build
        env:
          VITE_BASE: /portfolio/
```

Nothing else changes — every asset path is resolved through `import.meta.env.BASE_URL` (see [src/lib/asset.ts](src/lib/asset.ts)), so the CV download and favicon follow the base path automatically.

---

## Local development

```bash
npm install      # once
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the built site at http://localhost:4173
```

Node 20+ required (the CI workflow uses Node 22).

---

## Updating the content

| To change | Edit |
| --- | --- |
| Name, intro, phone, email, LinkedIn, CV filename | [src/data/profile.ts](src/data/profile.ts) |
| Teaching role, duties, course list | [src/data/experience.ts](src/data/experience.ts) |
| Degrees, grades, rank | [src/data/education.ts](src/data/education.ts) |
| Research interests (network nodes) | [src/data/researchInterests.ts](src/data/researchInterests.ts) |
| Research works and the transistor-evolution stages | [src/data/research.ts](src/data/research.ts) |
| Journal and conference papers | [src/data/publications.ts](src/data/publications.ts) |
| Projects, tools, metrics | [src/data/projects.ts](src/data/projects.ts) |
| Skill categories | [src/data/skills.ts](src/data/skills.ts) |
| Industrial trainings | [src/data/training.ts](src/data/training.ts) |
| Scholarships | [src/data/achievements.ts](src/data/achievements.ts) |
| Extracurricular activities | [src/data/extracurricular.ts](src/data/extracurricular.ts) |
| Referees | [src/data/referees.ts](src/data/referees.ts) |
| Section order and navigation labels | [src/data/navigation.ts](src/data/navigation.ts) |
| Page title, meta description, canonical URL, structured data | [index.html](index.html) |

### Replacing the CV PDF

Put the new file in `public/` and update `cvFile` in [src/data/profile.ts](src/data/profile.ts). Keep the file name free of spaces.

---

## Project structure

```
src/
├── data/         All CV content, typed against src/types.ts
├── sections/     One file per page section (13)
├── visuals/      Hand-built SVG figures — no stock images anywhere
├── components/
│   ├── layout/   Navbar, mobile nav, section rail, scroll progress, cursor glow, footer
│   └── ui/       Section, SectionHeader, Reveal, Tag, MagneticButton, ExternalLink
├── hooks/        useActiveSection, useCopyToClipboard
└── lib/          motion variants, asset path resolver, class-name helper
```

### Design notes

- Palette is fixed: background `#050816`, surface `#0F172A`, accents `#22D3EE` / `#6366F1` / `#A78BFA`. Gradients are reserved for the hero headline, section numbers, primary buttons and the active nav indicator.
- Every figure is inline SVG or CSS. The site ships **no raster images**, which is why it stays small (~150 kB gzipped total).
- Motion respects `prefers-reduced-motion`: animated figures render a static frame rather than a slower animation.
- Navigation on wide screens is the vertical numbered rail on the right; below `xl` it becomes a full-screen overlay index.

---

## Accessibility

Semantic landmarks, one `<h1>`, `<h2>` per section, skip-to-content link, real `<button>` elements with `aria-expanded` for every expandable panel, `aria-pressed` on filters and toggles, visible focus rings, and text contrast at or above 8:1 for body copy.
