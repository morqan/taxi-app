# ADR-001: Пересоздание taxi-app на стек 2026

**Статус:** Accepted
**Дата:** 2026-06-17
**Решает:** Морган (владелец)
**Связано:** `AUDIT-2026.md` (baseline-аудит, Senior-2026 Score = 3/100)

## Контекст

`taxi-app` — статичный UI-прототип на Ignite Andross (RN 0.59.9, 2019). Не собирается в 2026 ни на iOS (нет Podfile, target 9.0), ни на Android (Gradle 5.4 / AGP 3.4 / jcenter / targetSdk 28). Сетевого слоя такси нет (остался GitHub-boilerplate), типизация Flow (1 файл из 99), тесты — демо, CI отсутствует. Аудит показал: ценного JS ~10–15%, проект — S-размер (~4300 строк / 99 файлов).

Решение пройти ~17 мажоров RN in-place дороже и рискованнее, чем создать чистый проект и перенести JS. Цель — довести до **запускаемого MVP такси** (1 разработчик, фриланс).

## Решение

Пересоздать проект (`re-init`) на **Expo SDK 56 (RN 0.85, New Architecture) + React 19 + TypeScript 6**, перенести экраны с заменой Flow→TS, поднять реальный API-слой поверх mock-бэкенда. Native-части (карты, гео, платежи) — через Expo config plugins + dev-client.

## Зафиксированный стек (рекомендации по 8 развилкам)

| # | Развилка | Решение | Почему |
|---|----------|---------|--------|
| 1 | re-init vs in-place | **re-init** | ценного JS мало; in-place упирается в потолок RN-апгрейда iOS |
| 2 | Expo vs bare RN | **Expo (dev-client + config plugins)** | именно нативный maintenance убил проект; Expo снимает его с solo-разработчика, при этом карты/гео/Stripe доступны через config plugins |
| 3 | Состояние/данные | **Redux Toolkit + RTK Query** | проект уже Redux-формы (низкое трение переноса); RTK Query заменяет saga+apisauce целиком (кэш, retry, инвалидация) |
| 4 | Навигация | **Expo Router (typed routes)** | файловая навигация, deep linking из коробки, поверх React Navigation v7 |
| 5 | UI-kit | **NativeWind v4 + gluestack-ui v2** | заменяет native-base v2; Tailwind-стиль + готовые компоненты; легче Tamagui для solo |
| 6 | i18n | **i18next + react-i18next + expo-localization** | мигрирует существующий формат `App/I18n/languages`; зрелый, заменяет deprecated react-native-i18n |
| 7 | Карты/гео | **MapLibre + Nominatim (геокодинг) + OSRM (маршруты)** | бесплатный OSM-стек для dev/MVP; за адаптером, чтобы платный провайдер подменялся в prod |
| 8 | Mock-бэкенд | **MSW (основной) + json-server (ручное)** | один мок для приложения и тестов (network-level); json-server опционально для Postman |

## Trade-off (ключевое)

- **Expo vs bare:** теряем часть прямого контроля над нативкой, выигрываем — отсутствие ручной линковки/Gradle/Pods, EAS Build/Update, OTA-обновления. Для такси все нужные нативные модули (`react-native-maps`/MapLibre, `expo-location` + background task, `@stripe/stripe-react-native`) работают в Expo через config plugins. Это решает корневую боль проекта.
- **RTK vs Zustand+TanStack:** Zustand+TanStack легче, но это две библиотеки и иной mental model. RTK+RTK Query — один стор, прямой апгрейд существующей Redux-модели. Выбор в пользу низкого трения переноса.
- **OSM vs Google Maps:** публичные Nominatim/OSRM имеют rate-limit (для dev ок; для prod — self-host или платный тариф). Адаптерный слой геоданных изолирует провайдера.

## Последствия

- **Проще:** сборка (EAS), типобезопасность (TS strict), data-fetching (RTK Query), CI, обновления (OTA).
- **Сложнее:** нужно освоить Expo config plugins для нативных модулей; публичные OSM-сервисы требуют осторожности с rate-limit.
- **Пересмотреть позже:** провайдер карт/гео для prod; платёжный PSP (локальный азербайджанский vs Stripe) — отдельное решение перед боевой оплатой.

## Action Items (фазы → EXECUTION-PLAN.md)

1. [x] Scaffold Expo SDK 56 + TS + Expo Router, gate сборки (tsc чист)
2. [ ] Базовый tooling: ESLint 9 flat + Prettier + tsconfig strict + CI
3. [ ] API-слой: RTK Query + типы DTO + MSW mock-бэкенд (auth/profile/orders/payments)
4. [ ] Перенос экранов Flow→TS поверх нового UI-kit
5. [ ] i18n-миграция словарей
6. [ ] Карта/гео адаптер (MapLibre + Nominatim + OSRM)
7. [ ] Тесты (Jest + Testing Library RN) критичных flow + CI-gate
8. [ ] decision.md (baseline→final Score) + PR на review
