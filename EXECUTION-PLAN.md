# План исполнения — taxi-app re-init (senior-2026)

> Многосессионный. Каждая фаза = самодостаточный чекпойнт с atomic-коммитом. При возобновлении: читать этот файл → найти первую невыполненную фазу → продолжить. `master` оригинала не трогаем; работа только в этом worktree (ветка `modernize/senior-2026`). НЕ push/merge — финал = PR на review.

**Baseline Senior-2026 Score:** 3/100 · **Цель:** 80/100 (S-проект, платежи/auth/PII).

## Статус фаз

- [x] **Ф0. ADR + worktree** — `docs/adr/ADR-001`, ветка создана. ✅ чекпойнт 1
- [x] **Ф1. Scaffold** — bare React Native 0.86 + React 19 + TS 5.8 (CLI `@react-native-community/cli`) в worktree; src-структура, нативные ios/android; gate: tsc чист. ✅ (пересобрано на bare по решению владельца)
- [x] **Ф2. Tooling/DX** — ESLint 9 flat (typescript-eslint + react + hooks + simple-import-sort) + Prettier + tsconfig strict + husky pre-commit + GitHub Actions (Node 22; install→typecheck→lint→format→build RN bundle). gate: всё зелёное. ✅ чекпойнт
- [x] **Ф3. API-слой + mock** — RTK store + typed hooks, RTK Query baseApi (fetchBaseQuery + Bearer из Keychain), DTO-типы, 6 доменных слайсов (auth/profile/orders/payments/promo/news), MSW mock-бэкенд (db + handlers на все эндпоинты, сид из старых Fixtures), `.env` через react-native-config, токены в Keychain (не AsyncStorage). gate: typecheck/lint/format/build зелёные. ✅ чекпойнт
- [x] **Ф4. Перенос экранов** — выполнена (4a + 4b):
  - [x] **Ф4a. Фундамент** — NativeWind v4 (tailwind 3.4 + metro/babel) + тема; React Navigation v7 (auth-gate + bottom-tabs); auth-слайс; UI-примитивы (Button/Input/Card/Screen); 4 стаб-экрана. ✅
  - [x] **Ф4b. Перенос экранов** — 8 экранов через Workflow fan-out (Balance, PaymentMethod, AddCard→безопасный токен, Promo→серверная валидация, Ratings, DriverOrder, News, CountryPicker) Flow→TS на примитивы+RTK Query; MainNavigator (stack: tabs + 8 detail); навигация связана (Profile→Balance/PaymentMethod/Promo/News, Order→создать→DriverOrder, Orders→DriverOrder). gate: typecheck/lint/format/build (3.5M) зелёные; 0 any/disable/console. ✅ чекпойнт
  - _UI-kit: gluestack-ui отложен (ADR-001) — NativeWind + свои примитивы. Пропущены демо/вспомогательные: Gain(driver), Modal, Radio, Launch, Test._
- [x] **Ф5. i18n** — i18next + react-i18next + react-native-localize; свежие словари az/ru/en (старые были пустой Ignite-boilerplate); авто-определение языка устройства; переключатель языка в Profile; chrome (табы/заголовки) + все 14 экранов на t() (fan-out). gate: typecheck/lint/format/build зелёные; 0 any/disable/console. ✅ чекпойнт
- [x] **Ф6. Карта/гео** — GeoProvider-адаптер (Nominatim геокодинг + OSRM маршруты, типизированный fetch, изоляция провайдера); карта на Leaflet через react-native-webview (OSM-тайлы, без нативного SDK); превью маршрута по Баку в OrderScreen. gate: typecheck/lint/format/build зелёные; 0 any/disable/console. ✅ чекпойнт
- [ ] **Ф7. Decision + PR** — `decision.md` (baseline→final Score, beam-решения, anti-Goodhart), открыть PR. НЕ мержить.

> ⛔ Тесты по решению Моргана (2026-06-17) из плана исключены — автотесты не делаем. CI-gate держится на typecheck + lint + build, без прогона тестов.

## Anti-Goodhart (проверять перед каждым gate)

1. Балл не вырос за счёт удаления фич без замены.
2. Сборка реальна (метро/тайпчек emit-ят, не молчат).
3. Нет `any`-инфляции (tsconfig strict, без `as any`/`@ts-ignore`).
4. ~~Нет пустых тестов~~ — N/A (тесты исключены из плана).

## Beam-точки (top-3, не жадно)

- Ф3: baseQuery RTK Query — **РЕШЕНО: `fetchBaseQuery` (winner)**. Rejected: (a) кастомный axios-baseQuery — лишняя зависимость, fetch покрывает REST+Bearer+timeout; (b) graphql baseQuery — бэкенд REST, GraphQL избыточен. Реальной развилки нет → greedy оправдан (beam-3 был бы cargo-cult).
- Ф6: провайдер карт — **РЕШЕНО: Leaflet через react-native-webview (winner)**. Rejected: (a) MapLibre — нативный SDK, риск совместимости с RN 0.86 + тяжелее; (b) react-native-maps — нативный, тяготеет к Google/Apple, тот же риск сборки. Причина: WebView+Leaflet строится без нативного map-модуля и работает на gate. Для prod с тяжёлой картой — пересмотреть MapLibre.

## Порт-карта (что переносим / что выкидываем)

**Переносим (ценное):** экраны Containers/_ (Order, DriverOrder, Ratings, Profile, Balans, PaymentMethod, AddCreditCard, PromoKod, CountryPicker, Radio), стили, `Fixtures/_.json` (как seed для MSW), темы/метрики, иконки/изображения.
**Выкидываем (boilerplate):** GithubRedux/GithubSaga/Search, Api.js (GitHub-демо), ConvertFromKelvin, \*.story.js, Reactotron, демо-локали, enzyme-тесты, дублирующий лок-файл.

## Журнал чекпойнтов

- 2026-06-17 — Ф0 done: ADR-001 + worktree + план.
- 2026-06-17 — Ф1 done: scaffold Expo SDK 56 / RN 0.85 / React 19 / TS 6 / Expo Router влит в worktree, старый RN 0.59 заменён (оригинал цел в master-checkout для портирования), tsc зелёный (добавлен `src/types/css.d.ts`). NativeWind/RTK/expo-location ставятся на Ф2-Ф4.
- 2026-06-17 — Ф2 done (первая версия, на Expo): ESLint flat + Prettier + tsconfig strict + husky + CI. npm audit 225→11 moderate.
- 2026-06-17 — **РАЗВОРОТ Expo→bare RN** по решению владельца (привык к bare CLI во всех проектах, хочет полный контроль над нативкой). Ф1+Ф2 пересобраны на **bare React Native 0.86 + React 19 + TS 5.8**: новый scaffold через `@react-native-community/cli`, нативные ios/android, ESLint 9 flat переписан на typescript-eslint (без eslint-config-expo), babel module-resolver (@→src), src-структура, App.tsx минимальный, build-gate = `react-native bundle` (876K). npm audit: 7 moderate / 0 crit/high. ADR-001 обновлён (решение + trade-off bare↔Expo). Навигация в плане: Expo Router → React Navigation v7. Gate зелёный: typecheck/lint/format/build на Node 20 (CI на Node 22, как требует RN 0.86).
- 2026-06-17 — Ф3 done: API-слой на bare RN. RTK store + typed hooks; baseApi (fetchBaseQuery, Bearer-токен из Keychain через prepareHeaders); DTO в `src/api/types.ts`; 6 слайсов через injectEndpoints (auth OTP / profile+balance / orders CRUD+tariffs+rate+cancel / payments cards / promo / news); MSW mock (`src/mocks`: db с сидом из старых Fixtures — адреса Баку/AZN, handlers на все эндпоинты, server `msw/native`, enableMocking с динамическим импортом). Токены в react-native-keychain (НЕ AsyncStorage — закрыта находка аудита). `.env`/`.env.example` через react-native-config. baseQuery beam решён в пользу fetchBaseQuery. Фикс: добавлен `@babel/plugin-transform-class-static-block` (msw/@mswjs/interceptors используют static class blocks). Gate зелёный: typecheck/lint/format/build (2.5M).
- **REMAINING / оптимизация:** msw попадает в production-бандл (876K→2.5M) — динамический import не исключает его из графа metro. Позже: исключить msw из prod (metro resolver / dev-only entry). Нативная линковка react-native-config + react-native-keychain (pod install) нужна для рантайма на устройстве — для gate не требуется. Рантайм-проверка «мок реально отвечает» — на устройстве/симуляторе в Ф4.
- 2026-06-17 — Ф4a done: фундамент UI+навигации. NativeWind v4 (tailwind 3.4.19, metro `withNativeWind`, babel `nativewind/babel`, `global.css`, тема из старых Colors → tailwind + `src/theme/colors.ts`). React Navigation v7: RootNavigator с auth-гейтом (`authSlice.isAuthenticated`) → AuthNavigator | bottom-tabs (Order/Orders/Profile). UI-примитивы `src/components/ui` (Button/Input/Card/Screen). 4 стаб-экрана с реальными RTK Query хуками (useGetTariffs/Orders/Profile/Balance) — сквозная связка с MSW. NavigationContainer + Provider + SafeAreaProvider в App.tsx. Gate зелёный: typecheck/lint/format/build (3.5M); 0 any, 0 eslint-disable. Глобальную аугментацию типов навигации убрал (типобезопасность пер-экранно в Ф4b).
- 2026-06-17 — Ф4b done: 8 экранов через Workflow fan-out (8 агентов, ~382K токенов, 86с): Balance, PaymentMethod, AddCard (безопасный — псевдо-токен вместо PAN/CVC, без логирования), Promo (серверная валидация, без хардкода '123456'), Ratings, DriverOrder, News, CountryPicker. MainNavigator (native-stack: tabs + 8 detail-экранов). Навигация связана: Profile→Balance/PaymentMethod/Promo/News, Order→createOrder→DriverOrder, Orders→DriverOrder→Ratings. ESLint: добавлен argsIgnorePattern '^\_' (конвенция intentionally-unused). Gate зелёный: typecheck/lint/format/build (3.5M); 0 any/disable/console. fan-out дал TS-совместимые файлы с первого прохода.
- 2026-06-17 — Ф5 done: i18n. Инфра (словари az/ru/en, i18next init + авто-определение языка, свитчер в Profile, chrome) — коммит 7c70346. Конвертация 14 экранов на t() через Workflow fan-out (первый прогон упал по session-limit → 0; второй прогон успешно конвертировал 11 экранов + комментарии в нужных местах). Gate зелёный: typecheck/lint/format/build (3.5M); 0 any/disable/console.
- 2026-06-17 — Ф6 done: GeoProvider-адаптер `src/features/geo` (osmGeoProvider: Nominatim geocode/reverse + OSRM route, типизированный fetch, User-Agent, комментарии про rate-limit и подмену prod); WebMap на Leaflet через react-native-webview (OSM-тайлы, маркеры, polyline); превью маршрута по Баку встроено в OrderScreen (ScrollView). beam карты решён в пользу Leaflet-webview. Gate зелёный: typecheck/lint/format/build (3.5M); 0 any/disable/console.
- **Точка возобновления:** следующая — **Ф7** (decision.md: baseline→final Score + anti-Goodhart + PR). Финальная фаза.
