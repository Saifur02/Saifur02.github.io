/**
 * Resolve a file in `public/` against Vite's configured base path, so assets
 * keep working whether the site is served from `USERNAME.github.io/` or from
 * `USERNAME.github.io/<repo>/`. Never hardcode a leading-slash asset path.
 */
export function asset(fileName: string): string {
  const base = import.meta.env.BASE_URL // always ends with '/'
  return `${base}${fileName.replace(/^\/+/, '')}`
}
