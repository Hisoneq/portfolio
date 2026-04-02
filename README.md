# Portfolio

Одностраничное портфолио на React + Vite + TypeScript + Tailwind с анимациями (Framer Motion, плавный скролл Lenis) и эффектами в духе [React Bits](https://github.com/DavidHDev/react-bits) (сплит-текст, aurora-фон, сетка, spotlight-карточки).

## Редактирование контента

Все тексты, проекты, отзывы и контакты задаются в **[`src/content/site.ts`](src/content/site.ts)** — замените плейсхолдеры на свои данные.

## Команды

```bash
npm install
npm run dev
npm run build
npm run preview
```

Локально приложение открывается с базой `/portfolio/` (как на GitHub Pages): **http://localhost:5173/portfolio/**

## Деплой на GitHub Pages

Репозиторий должен быть опубликован как **project site** (`https://<user>.github.io/<repo>/`). В [`vite.config.ts`](vite.config.ts) уже указано `base: '/portfolio/'` — при другом имени репозитория поменяйте `base` на `/<имя-репо>/`.

```bash
npm run deploy
```

Команда собирает проект и пушит папку `dist` в ветку `gh-pages` (нужен настроенный `git` и права на репозиторий). В настройках GitHub: **Pages → Build and deployment → branch `gh-pages` / root**.

В корне [`public/404.html`](public/404.html) добавлен редирект для SPA при прямом заходе на вложенные маршруты.

## Лицензия

Код портфолио — по желанию автора. Компоненты, скопированные из сторонних библиотек, наследуют их лицензии.
