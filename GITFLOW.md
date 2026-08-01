# Guía Git Flow — TaskFlow

Requisitos que cubre: repo no vacío, flujo Git Flow claro, 5 ramas feature/hotfix,
3 PRs por rama (dev, qa, main), 15 PRs cerrados en total, todo integrado en main.

Necesitas tener instalado **GitHub CLI** (`gh`) y estar autenticado (`gh auth login`).
Si no quieres usar `gh`, puedes hacer los mismos pasos abriendo los PRs manualmente
en la web de GitHub — el orden de ramas es lo importante.

## 0. Preparación

```bash
# Crea el repo en GitHub (cámbiale el nombre si quieres)
gh repo create taskflow --public --clone
cd taskflow

# Copia aquí todos los archivos del proyecto que te generé
# (server.js, routes/, views/, public/, data/, package.json, etc.)

git add .
git commit -m "Initial commit: estructura base del proyecto TaskFlow"
git push -u origin main

# Crea las ramas base dev y qa a partir de main
git checkout -b dev
git push -u origin dev

git checkout -b qa
git push -u origin qa

git checkout main
```

## 1. Patrón que se repite por cada una de las 5 ramas

Para **cada** rama feature/hotfix vas a: crear la rama desde `dev` (o desde `main`
si es un hotfix), hacer un commit con el código correspondiente, subirla, y abrir
3 Pull Requests (uno hacia `dev`, uno hacia `qa`, uno hacia `main`), cerrándolos
(mergeando) uno por uno.

Ejemplo con `feature/login-form`:

```bash
git checkout dev
git checkout -b feature/login-form

# Copia/agrega el código de esa funcionalidad (routes/auth.js, views/login.ejs)
git add routes/auth.js views/login.ejs
git commit -m "feat: agregar formulario de login"
git push -u origin feature/login-form

# PR 1: hacia dev
gh pr create --base dev --head feature/login-form \
  --title "feature/login-form -> dev" \
  --body "Agrega formulario de login simulado"
gh pr merge feature/login-form --merge --delete-branch=false

# PR 2: hacia qa
gh pr create --base qa --head feature/login-form \
  --title "feature/login-form -> qa" \
  --body "Promueve login-form a QA"
gh pr merge feature/login-form --merge --delete-branch=false

# PR 3: hacia main
gh pr create --base main --head feature/login-form \
  --title "feature/login-form -> main" \
  --body "Integra login-form a producción"
gh pr merge feature/login-form --merge --delete-branch=false
```

Repite exactamente este patrón (crear rama → commit → 3 PRs → 3 merges) para
cada una de las 5 ramas:

| Rama | Archivos a agregar en el commit |
|---|---|
| `feature/login-form` | `routes/auth.js`, `views/login.ejs` |
| `feature/validate-user-input` | `routes/validators.js` |
| `feature/task-api-integration` | `routes/api.js` |
| `feature/user-dashboard` | `routes/dashboard.js`, `views/dashboard.ejs` |
| `hotfix/fix-date-format` | `routes/dateUtils.js` |

> Nota: para el hotfix, en Git Flow real se crea desde `main` en vez de `dev`.
> Usa `git checkout main && git checkout -b hotfix/fix-date-format`.

## 2. Verificación final

Al terminar las 5 rondas tendrás:

- 5 ramas feature/hotfix
- 15 Pull Requests, todos en estado **Closed/Merged**
- Todo el código integrado en `main`

Puedes verificarlo con:

```bash
gh pr list --state closed --limit 20
git log --oneline --graph --all
```

## 3. Consejo práctico

Como cada PR modifica archivos distintos entre ramas, no deberías tener
conflictos de merge. Si `dev` o `qa` avanzan y luego mergeas a `main`, GitHub
puede marcar el PR hacia `main` como "ya no tiene cambios" si el commit ya
llegó por otra vía — en ese caso simplemente ábrelo igual (GitHub permite
PRs vacíos de historial) o haz un commit trivial (ej. un comentario) por rama
para que cada uno de los 3 PRs tenga contenido propio que mergear.
