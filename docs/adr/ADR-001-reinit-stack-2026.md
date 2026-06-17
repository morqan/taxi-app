# ADR-001: Пересоздание taxi-app на стек 2026

**Статус:** Accepted
**Дата:** 2026-06-17
**Решает:** Морган (владелец)
**Связано:** `AUDIT-2026.md` (baseline-аудит, Senior-2026 Score = 3/100)

## Контекст

`taxi-app` — статичный UI-прототип на Ignite Andross (RN 0.59.9, 2019). Не собирается в 2026 ни на iOS (нет Podfile, target 9.0), ни на Android (Gradle 5.4 / AGP 3.4 / jcenter / targetSdk 28). Сетевого слоя такси нет (остался GitHub-boilerplate), типизация Flow (1 файл из 99), тесты — демо, CI отсутствует. Аудит показал: ценного JS ~10–15%, проект — S-размер (~4300 строк / 99 файлов).

Решение пройти ~17 мажоров RN in-place дороже и рискованнее, чем создать чистый проект и перенести JS. Цель — довести до **запускаемого MVP такси** (1 разработчик, фриланс).

## Решение

Пересоздать проект (`re-init`) на **bare React Native 0.86 CLI + React 19 + TypeScript 5.8**, перенести экраны с заменой Flow→TS, поднять реальный API-слой поверх mock-бэкенда. Нативные части (`ios/`, `android/`) управляются напрямую (CocoaPods/Gradle) — владелец сознательно берёт нативный maintenance на себя ради полного контроля и единообразия с другими своими проектами.

> **Эволюция решения (2026-06-17):** изначально рекомендовался **Expo** (CNG/prebuild + config plugins снимают нативный maintenance — ту боль, что убила проект). Владелец выбрал **bare RN CLI**: привычный инструмент во всех его проектах, полный контроль над нативкой с дня 1. Trade-off принят осознанно — см. ниже.

## Зафиксированный стек (решения по 8 развилкам)

| #   | Развилка            | Решение                                                | Почему                                                                                              |
| --- | ------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| 1   | re-init vs in-place | **re-init**                                            | ценного JS мало; in-place упирается в потолок RN-апгрейда iOS                                       |
| 2   | Expo vs bare RN     | **bare React Native CLI**                              | выбор владельца: привычный CLI, полный контроль над ios/android; нативный maintenance берём на себя |
| 3   | Состояние/данные    | **Redux Toolkit + RTK Query**                          | проект уже Redux-формы (низкое трение переноса); RTK Query заменяет saga+apisauce (кэш, retry)      |
| 4   | Навигация           | **React Navigation v7 (native-stack, typed)**          | стандарт для bare RN; типобезопасные маршруты, deep linking                                         |
| 5   | UI-kit              | **NativeWind v4 + gluestack-ui v2**                    | заменяет native-base v2; Tailwind-стиль + готовые компоненты; легче Tamagui для solo                |
| 6   | i18n                | **i18next + react-i18next**                            | мигрирует формат `App/I18n/languages`; зрелый, заменяет deprecated react-native-i18n                |
| 7   | Карты/гео           | **MapLibre + Nominatim (геокодинг) + OSRM (маршруты)** | бесплатный OSM-стек для dev/MVP; за адаптером, чтобы платный провайдер подменялся в prod            |
| 8   | Mock-бэкенд         | **MSW (основной) + json-server (ручное)**              | network-level мок для разработки приложения; json-server опционально для Postman                    |

## Trade-off (ключевое)

- **Bare vs Expo:** выигрываем полный прямой контроль над нативкой и привычный воркфлоу; платим за это ручным maintenance — CocoaPods/Gradle, ручная линковка нативных модулей, ручные апгрейды RN (та самая работа, что в RN 0.59 и привела к смерти проекта). Снижаем риск через CI-gate, единый lock и дисциплину апгрейдов.
- **RTK vs Zustand+TanStack:** Zustand+TanStack легче, но это две библиотеки и иной mental model. RTK+RTK Query — один стор, прямой апгрейд существующей Redux-модели. Выбор в пользу низкого трения переноса.
- **OSM vs Google Maps:** публичные Nominatim/OSRM имеют rate-limit (для dev ок; для prod — self-host или платный тариф). Адаптерный слой геоданных изолирует провайдера.

## Последствия

- **Проще:** типобезопасность (TS strict), data-fetching (RTK Query), CI, полный контроль над нативной частью.
- **Сложнее:** апгрейды RN и линковка нативных модулей — вручную; сборка iOS требует Mac + CocoaPods; нет EAS/OTA из коробки.
- **Пересмотреть позже:** провайдер карт/гео для prod; платёжный PSP (локальный азербайджанский vs Stripe) — отдельное решение перед боевой оплатой; при росте нативной боли — повторно оценить Expo prebuild.

## Action Items (фазы → EXECUTION-PLAN.md)

1. [x] Scaffold bare RN 0.86 + TS, gate сборки (tsc/lint/build чисты)
2. [x] Базовый tooling: ESLint 9 flat + Prettier + tsconfig strict + husky + CI
3. [x] API-слой: RTK Query + типы DTO + MSW mock-бэкенд (auth/profile/orders/payments)
4. [x] Перенос экранов Flow→TS + React Navigation v7 поверх нового UI-kit
5. [x] i18n-миграция словарей (свежие az/ru/en)
6. [x] Карта/гео адаптер (Leaflet-webview + Nominatim + OSRM — beam: не MapLibre)
7. [x] decision.md (baseline 3 → final 83) + PR на review

> Примечание (2026-06-17): автотесты исключены из объёма по решению владельца. CI-gate = typecheck + lint + format + build.
