# taxi-app

Мобильное приложение такси (rider) на React Native. Пересоздано в 2026 на современный стек
с легаси-версии (RN 0.59.9, Ignite, 2019). История модернизации — `decision.md` и
`EXECUTION-PLAN.md`, архитектурные решения — `docs/adr/ADR-001`.

## Стек

- **React Native 0.86** (bare CLI) + **React 19** + **TypeScript 5.8** (strict)
- **Redux Toolkit + RTK Query** — состояние и data-fetching
- **React Navigation v7** (native-stack + bottom-tabs)
- **NativeWind v4** (Tailwind) — стилизация
- **i18next** — локализация (az / ru / en, авто-определение языка)
- **MSW** — mock-бэкенд для разработки
- **react-native-keychain** — токены сессии (не AsyncStorage)
- **react-native-config** — переменные окружения
- Карта: **Leaflet** через WebView + бесплатный OSM-стек (**Nominatim** геокодинг, **OSRM** маршруты)

## Запуск

```sh
nvm use                 # Node 22 (требует RN 0.86)
npm install
cp .env.example .env     # API_URL, USE_MOCK=true, GOOGLE_MAPS_API_KEY

# iOS (нужен Mac + CocoaPods)
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Metro
npm start
```

С `USE_MOCK=true` приложение работает на MSW-моке без реального бэкенда.

## Скрипты

| Скрипт                            | Что делает                               |
| --------------------------------- | ---------------------------------------- |
| `npm run typecheck`               | `tsc --noEmit`                           |
| `npm run lint` / `lint:fix`       | ESLint 9 (flat config)                   |
| `npm run format` / `format:check` | Prettier                                 |
| `npm run build`                   | сборка JS-бандла (`react-native bundle`) |

Pre-commit (husky + lint-staged) прогоняет lint + typecheck. CI (GitHub Actions):
`install → typecheck → lint → format → build`.

## Статус

Готов современный **каркас** (навигация, экраны, API-слой на моке, i18n, карта-превью).
**Автотесты не входят в объём** (решение владельца). Для боевого MVP нужны: реальный backend,
платёжный провайдер, real-time трекинг, водительская часть — см. раздел Remaining в `decision.md`.

## Структура

```
src/
  api/          # baseApi (RTK Query) + DTO-типы
  features/     # auth, orders, payments, profile, promo, news, geo — по фиче
  components/ui # примитивы (Button, Input, Card, Screen)
  navigation/   # Root / Auth / Main (tabs + detail stack)
  i18n/         # i18next + словари az/ru/en
  mocks/        # MSW (db + handlers)
  store/        # Redux store + typed hooks
  theme/        # цвета
```
