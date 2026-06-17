# План исполнения — taxi-app re-init (senior-2026)

> Многосессионный. Каждая фаза = самодостаточный чекпойнт с atomic-коммитом. При возобновлении: читать этот файл → найти первую невыполненную фазу → продолжить. `master` оригинала не трогаем; работа только в этом worktree (ветка `modernize/senior-2026`). НЕ push/merge — финал = PR на review.

**Baseline Senior-2026 Score:** 3/100 · **Цель:** 80/100 (S-проект, платежи/auth/PII).

## Статус фаз

- [x] **Ф0. ADR + worktree** — `docs/adr/ADR-001`, ветка создана. ✅ чекпойнт 1
- [x] **Ф1. Scaffold** — Expo SDK 56 + RN 0.85 + React 19 + TS 6 + Expo Router в worktree; gate: tsc чист. ✅ чекпойнт 2
- [x] **Ф2. Tooling/DX** — ESLint 9 flat + Prettier + tsconfig strict + husky pre-commit + GitHub Actions (install→typecheck→lint→format→build). gate: typecheck/lint/format/build зелёные. ✅ чекпойнт 4
- [ ] **Ф3. API-слой + mock** — RTK store, RTK Query baseApi, DTO-типы, MSW-хендлеры для auth(OTP)/profile/balance/orders(CRUD+rate)/payments. `.env` через `expo-constants`/`react-native-config`. gate: типизированные хуки + мок отвечает.
- [ ] **Ф4. Перенос экранов** — Flow→TS, перенос ~18 экранов на NativeWind + gluestack-ui, привязка к RTK Query вместо хардкода. **Fan-out кейс** (Workflow: 1 агент на экран). gate: навигация ходит по всем экранам на mock-данных.
- [ ] **Ф5. i18n** — i18next + словари из старого `App/I18n/languages` (az/ru/en), expo-localization. gate: переключение языка работает.
- [ ] **Ф6. Карта/гео** — адаптер геопровайдера: MapLibre + Nominatim + OSRM (free), интерфейс для подмены prod. gate: карта рендерится, геокодинг отвечает.
- [ ] **Ф7. Decision + PR** — `decision.md` (baseline→final Score, beam-решения, anti-Goodhart), открыть PR. НЕ мержить.

> ⛔ Тесты по решению Моргана (2026-06-17) из плана исключены — автотесты не делаем. CI-gate держится на typecheck + lint + build, без прогона тестов.

## Anti-Goodhart (проверять перед каждым gate)

1. Балл не вырос за счёт удаления фич без замены.
2. Сборка реальна (метро/тайпчек emit-ят, не молчат).
3. Нет `any`-инфляции (tsconfig strict, без `as any`/`@ts-ignore`).
4. ~~Нет пустых тестов~~ — N/A (тесты исключены из плана).

## Beam-точки (top-3, не жадно)

- Ф3: baseQuery RTK Query — `fetchBaseQuery` vs кастомный axios-base vs graphql. → измерить, winner + 2 rejected в decision.
- Ф6: провайдер карт — MapLibre vs react-native-maps(OSM tiles) vs Leaflet-webview.

## Порт-карта (что переносим / что выкидываем)

**Переносим (ценное):** экраны Containers/_ (Order, DriverOrder, Ratings, Profile, Balans, PaymentMethod, AddCreditCard, PromoKod, CountryPicker, Radio), стили, `Fixtures/_.json` (как seed для MSW), темы/метрики, иконки/изображения.
**Выкидываем (boilerplate):** GithubRedux/GithubSaga/Search, Api.js (GitHub-демо), ConvertFromKelvin, \*.story.js, Reactotron, демо-локали, enzyme-тесты, дублирующий лок-файл.

## Журнал чекпойнтов

- 2026-06-17 — Ф0 done: ADR-001 + worktree + план.
- 2026-06-17 — Ф1 done: scaffold Expo SDK 56 / RN 0.85 / React 19 / TS 6 / Expo Router влит в worktree, старый RN 0.59 заменён (оригинал цел в master-checkout для портирования), tsc зелёный (добавлен `src/types/css.d.ts`). NativeWind/RTK/expo-location ставятся на Ф2-Ф4.
- 2026-06-17 — Ф2 done: ESLint 9 flat (eslint-config-expo + simple-import-sort + eqeqeq + no-console) + Prettier + tsconfig strict (noUncheckedIndexedAccess, noFallthroughCasesInSwitch) + husky pre-commit (lint-staged + typecheck) + GitHub Actions CI + .nvmrc/.editorconfig/engines. Проект переименован taxi-scaffold-tmp→taxi-app. use-color-scheme.web.ts переписан на useSyncExternalStore (убран set-state-in-effect). npm audit: 225(60crit/80high) → 11 moderate (транзитивный uuid в Expo SDK, не фиксится без отката). Gate зелёный: typecheck/lint/format/build(3.5M dist).
- **Точка возобновления:** следующая — Ф3 (API-слой: RTK store + RTK Query baseApi + DTO-типы + MSW mock-бэкенд).
