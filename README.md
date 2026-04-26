# 25 Cafe

Noční kavárna s webovou prezentací vytvořenou pomocí React, Vite a Tailwind CSS.

## 🚀 Deploy na GitHub Pages

Tento projekt je nakonfigurován pro automatické nasazení na GitHub Pages.

### Jak publikovat:

1. **Pushněte kód na GitHub** (na branch `main`)

2. **Povolte GitHub Pages:**
   - Jděte do Settings → Pages
   - Source: "GitHub Actions"

3. **Automatické deploy:**
   - Při každém push na `main` se spustí GitHub Actions workflow
   - Build se vytvoří v `artifacts/25cafe/docs/`
   - Stránka bude dostupná na `https://[username].github.io/25-cafe/`

### Lokální development:

```bash
# Nainstalujte závislosti
pnpm install

# Spusťte dev server
cd artifacts/25cafe
pnpm run dev

# Build pro produkci
pnpm run build
```

### Struktura projektu:

- `artifacts/25cafe/` - Hlavní React aplikace
- `docs/` - Build output pro GitHub Pages
- `.github/workflows/deploy.yml` - GitHub Actions workflow

### Technologie:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Shadcn/ui komponenty
- Wouter (routing)

### Poznámky:

- Base path je nastaven na `/25-cafe/` pro GitHub Pages
- SPA routing je řešen pomocí 404.html fallback
- Jazyk aplikace: čeština (primární), angličtina (sekundární)