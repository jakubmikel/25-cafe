# Příprava souboru ke stažení

Pro vytvoření jednoho archivu s kódem připraveným pro nahrání do nového GitHub repozitáře:

```bash
pnpm -C artifacts/25cafe prepare:download
```

Výsledný soubor:

`artifacts/25cafe/dist-download/25cafe-github-ready.zip`

Archiv obsahuje pouze klíčové části projektu (`src`, `public`, konfigurační soubory Vite/TS a `package.json`) bez `node_modules`.
