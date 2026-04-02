# Portfolio

Одностраничное портфолио на React + Vite + TypeScript + Tailwind с анимациями (Framer Motion, плавный скролл Lenis) и эффектами в духе [React Bits](https://github.com/DavidHDev/react-bits).

## Редактирование контента

Все тексты, проекты, отзывы и контакты — в **[`src/content/site.ts`](src/content/site.ts)**.

## Команды

```bash
npm install
npm run dev
npm run build
npm run preview
```

**Локально** по умолчанию `base` = `/portfolio/`: открывай **http://localhost:5173/portfolio/**  
Чтобы проверить сборку как в CI (имя репозитория, например `my-site`):

```bash
VITE_BASE_PATH=/my-site/ npm run build && npm run preview
```

После `npm run build` скрипт копирует `dist/index.html` → `dist/404.html`, чтобы на GitHub Pages открывались прямые ссылки вида `.../projects/slug`.

## Деплой через GitHub Actions → GitHub Pages

1. Залей репозиторий на GitHub.
2. **Settings → Pages → Build and deployment**: источник **GitHub Actions** (не branch `gh-pages`).
3. Убедись, что основная ветка называется **`main`** или **`master`** (workflow слушает оба имени).
4. После пуша открой вкладку **Actions**: пайплайн **Deploy GitHub Pages** соберёт проект с  
   `VITE_BASE_PATH=/<имя-репозитория>/` и выложит артефакт.

Сайт будет по адресу: `https://<username>.github.io/<repository>/`

**Если репозиторий не `portfolio`:** ничего менять в коде не нужно — в CI подставляется имя репо автоматически. Локально для привычного URL задай `VITE_BASE_PATH` как выше или оставь дефолт `/portfolio/` и открывай dev по `/portfolio/`.

**Сайт на корне** (`username.github.io` без подпути): в workflow в шаге Build задай  
`VITE_BASE_PATH: /` и в `vite.config` при желании смени дефофт для локалки.

### Старый способ через `gh-pages`

Команда `npm run deploy` по-прежнему доступна, если настроен пакет `gh-pages` и ветка Pages вручную.

## Лицензия

По желанию автора.
