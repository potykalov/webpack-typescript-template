# Webpack + TypeScript Template

[![Node.js CI](https://github.com/potykalov/webpack-typescript-template/actions/workflows/node-ci.yml/badge.svg)](https://github.com/potykalov/webpack-typescript-template/actions/workflows/node-ci.yml)

Учебный шаблон TypeScript-проекта с настроенными сборкой, локальным сервером разработки, проверкой типов и автоматическими проверками. Репозиторий отмечен как **GitHub Template Repository**: его можно использовать для создания новых проектов.

В `src/app.ts` пока нет логики приложения, а тестовые файлы отсутствуют. Шаблон предоставляет окружение, а не готовое приложение или подтверждённое тестовое покрытие.

## Возможности

- **TypeScript 6** — статическая типизация; проверка исходного кода через `tsc --noEmit`.
- **Webpack 5** и **webpack-dev-server** — сборка и локальный сервер разработки.
- **Babel 8** с `@babel/preset-env` и `@babel/preset-typescript` — преобразование JavaScript и TypeScript при сборке.
- **core-js** — полифиллы; **Browserslist** — настройки целевых браузеров.
- **Jest 30** — запуск тестов; в текущей конфигурации сбор покрытия настроен для JavaScript-файлов.
- **ESLint 10** — проверка JavaScript-файлов (`.js`, `.mjs`, `.cjs`), но не TypeScript-файлов.
- **Husky 9** — запуск тестов, ESLint и проверки типов перед коммитом.
- **GitHub Actions** — автоматическая проверка тестов, JavaScript-кода, типов и production-сборки.
- **Dependabot** — проверка обновлений npm-зависимостей и GitHub Actions.
- **CodeQL** — анализ безопасности, включённый в этом репозитории через GitHub default setup.
- **EditorConfig** и **Git attributes** — единые правила оформления файлов и нормализация окончаний строк.

## Требования

- Node.js 26 (эта версия используется в CI).
- npm.

## Создание проекта и запуск

1. На странице репозитория выберите **Use this template → Create a new repository**.
2. Клонируйте созданный репозиторий и установите зависимости:

```bash
git clone https://github.com/USERNAME/PROJECT-NAME.git
cd PROJECT-NAME
npm install
```

3. Замените `PROJECT-NAME` в `package.json` на название своего проекта и актуализируйте поля `repository.url`, `bugs.url` и `homepage`.
4. Запустите сервер разработки:

```bash
npm start
```

Сервер настроен на порт `8080` и автоматически открывает страницу в браузере. Основная точка входа — `src/index.ts`; файл `src/app.ts` предназначен для логики приложения. Конфигурация сборки находится в `webpack.config.ts`.

## Команды

| Команда | Назначение |
| --- | --- |
| `npm start` | Запуск локального сервера разработки |
| `npm run dev` | Development-сборка |
| `npm run prod` | Production-сборка в `dist/` |
| `npm run typecheck` | Проверка типов исходного кода командой `tsc --noEmit` |
| `npm test` | Запуск Jest |
| `npm run coverage` | Запуск Jest с формированием отчёта о покрытии |
| `npm run lint` | Проверка JavaScript-файлов с помощью ESLint |

## TypeScript и сборка

- `tsconfig.json` включает строгую проверку (`strict: true`) исходного кода в `src/`. Команда `npm run typecheck` использует эту конфигурацию.
- `tsconfig.webpack.json` содержит отдельные настройки типов для `webpack.config.ts`. Текущий скрипт `typecheck` **не запускает** отдельную проверку этой конфигурации.
- `webpack.config.ts` обрабатывает `.ts` и `.js` через Babel, а также подключает HTML, CSS, изображения и шрифты.
- `src/global.d.ts` содержит объявление модуля для импорта CSS-файлов.
- `src/app.ts` и `src/css/style.css` — пустые заготовки для будущего проекта.

Babel преобразует TypeScript при сборке, но не заменяет проверку типов. Для проверки типов отдельно используется TypeScript.

## Тестирование

В `jest.config.js` включены очистка моков перед тестами (`clearMocks`), подробный вывод (`verbose`) и каталог отчётов `coverage/`.

Покрытие настроено для `src/**/*.js` с исключением `__tests__`; TypeScript-файлы в текущем `collectCoverageFrom` не указаны. Глобальный порог покрытия строк задан как **100%** — это требование конфигурации, **не фактически достигнутый показатель**.

Сам шаблон не содержит тестов. До их добавления обычный запуск `npm test` завершается сообщением `No tests found`. В pre-commit проверке используется `--passWithNoTests`, а CI пропускает этап покрытия, если тесты не обнаружены.

## Проверки перед коммитом и CI

Файл `.husky/pre-commit` запускает:

```bash
npm test -- --passWithNoTests && npm run lint && npm run typecheck
```

Workflow [Node.js CI](.github/workflows/node-ci.yml) запускается при `push` и `pull_request` в ветку `main`. Он выполняет `npm ci`, проверяет наличие тестов, запускает покрытие при наличии тестов, затем выполняет `npm run lint`, `npm run typecheck` и `npm run prod`.

В GitHub Actions установлена переменная `HUSKY=0`, поскольку проверки запускаются отдельными шагами workflow.

## Обновления зависимостей и безопасность

[Dependabot](.github/dependabot.yml) проверяет npm-зависимости еженедельно, а GitHub Actions — ежемесячно.

В **этом репозитории** CodeQL включён через GitHub default setup; отдельного workflow CodeQL в каталоге `.github/workflows/` нет. В новом репозитории, созданном из шаблона, настройки CodeQL необходимо проверить отдельно в **Settings → Security → Code security**.

## Структура проекта

```text
.
├── .github/
│   ├── workflows/
│   │   └── node-ci.yml
│   └── dependabot.yml
├── .husky/
│   └── pre-commit
├── src/
│   ├── css/
│   │   └── style.css
│   ├── app.ts
│   ├── global.d.ts
│   ├── index.html
│   └── index.ts
├── .browserslistrc
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .prettierignore
├── babel.config.js
├── eslint.config.js
├── jest.config.js
├── tsconfig.json
├── tsconfig.webpack.json
├── webpack.config.ts
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

## Дополнительные настройки

- `.gitignore` исключает `node_modules/`, `dist/` и `coverage/` из Git.
- `.editorconfig` задаёт UTF-8, отступ в два пробела, LF и перевод строки в конце файла.
- `.gitattributes` содержит `* text=auto` для автоматической нормализации текстовых файлов.
- `.browserslistrc` использует значение `defaults`.
- `.prettierignore` исключает `dist/` из форматирования.

## Лицензия

[MIT](LICENSE)
