---
тип: modernization-decision
repo: taxi-app
дата: 2026-06-17
baseline_score: 3
final_score: 83
delta: +80
target: 80-85
status: success
---

# Modernization Decision — taxi-app (2026-06-17)

Старый фриланс-проект (React Native 0.59.9, Ignite, 2019, не собирался в 2026) пересоздан на
современный стек и доведён до уровня senior-2026. Работа велась в worktree на ветке
`modernize/senior-2026`. **Запушена, PR создан и смержена в `master`** по прямому решению владельца (2026-06-17).

## Summary

|                        |                                                            |
| ---------------------- | ---------------------------------------------------------- |
| Baseline → Final Score | 3 → 83 (+80)                                               |
| Target                 | 80–85 (S-проект, платежи/auth/PII)                         |
| Фаз выполнено          | 7/7 (тесты исключены по решению владельца)                 |
| Коммитов (atomic)      | 10                                                         |
| Worktree leaks         | 0 (master нетронут)                                        |
| npm audit              | 225 (60 crit / 80 high) → **7 moderate / 0 crit / 0 high** |
| TypeScript             | 0 → **44/44 файлов, 0 `any`**                              |

## Score breakdown (baseline → final)

| Ось            | Вес     | Baseline | Final   | Обоснование final                                                  |
| -------------- | ------- | -------- | ------- | ------------------------------------------------------------------ |
| Build health   | 15      | 0        | 13.5    | `react-native bundle` собирает (3.5M); −штраф за msw в prod-бандле |
| Type safety    | 20      | 0        | 20      | 100% TS, strict + noUncheckedIndexedAccess, 0 `any`                |
| Tests          | 15      | 0        | 0       | исключены по решению владельца                                     |
| Security       | 15      | 0        | 14.7    | 7 moderate / 0 crit / 0 high (от baseline 412-weighted)            |
| Lint/Format    | 10      | ~1       | 10      | ESLint 9 flat + Prettier + husky, 0 warnings                       |
| Deps freshness | 10      | ~1       | 10      | RN 0.86 / React 19 / TS 5.8 — актуальный стек                      |
| Tooling        | 10      | ~1.5     | 10      | metro/RN live, единый lock, Hermes-ready                           |
| CI/DX          | 5       | ~0.3     | 5       | GitHub Actions (typecheck/lint/format/build) + честный README      |
| **Итого**      | **100** | **≈3**   | **≈83** | +80                                                                |

> Потолок ограничен 85, т.к. ось «Тесты» (15) исключена владельцем. Цель 80–85 достигнута.

## Фазы (atomic commits)

| Фаза             | Коммит              | Что                                             |
| ---------------- | ------------------- | ----------------------------------------------- |
| Re-init scaffold | `0616f83`→`fdb5f79` | Expo → разворот на bare RN 0.86 + React 19 + TS |
| Ф2 Tooling       | `1a5e8c6`           | ESLint 9 flat + Prettier + husky + CI           |
| Ф3 API + mock    | `7936488`           | RTK Query + 6 слайсов + DTO + MSW + Keychain    |
| Ф4a Фундамент    | `22c7e42`           | NativeWind + React Navigation v7 + примитивы    |
| Ф4b Экраны       | `0a78949`           | 8 экранов (fan-out) + навигация                 |
| Ф5 i18n          | `7c70346`+`941c73a` | i18next az/ru/en + 14 экранов на t()            |
| Ф6 Карта/гео     | `0546eeb`           | GeoProvider (Nominatim+OSRM) + Leaflet WebMap   |
| Ф7 Decision      | _этот_              | decision.md + README                            |

## Beam decisions

- **baseQuery (Ф3):** WINNER `fetchBaseQuery`. REJECTED: кастомный axios-baseQuery (лишняя зависимость), graphql baseQuery (бэкенд REST). Реальной развилки нет → greedy.
- **Провайдер карты (Ф6):** WINNER Leaflet через react-native-webview. REJECTED: MapLibre (нативный SDK, риск совместимости с RN 0.86), react-native-maps (нативный, Google/Apple). Причина: WebView+Leaflet строится без нативного map-модуля.
- **Стек (ADR-001):** re-init vs in-place → re-init; Expo vs bare → bare (решение владельца).

## Anti-Goodhart

| Проверка                               | Результат             | Деталь                                                                                                                                      |
| -------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. no-trivial-trick (нет удаления фич) | ✅ PASS               | −39k строк = замена EOL-проекта (Ignite/yarn.lock/нативка RN0.59) на новый стек; экраны переписаны, не удалены (re-init = замена toolchain) |
| 2. build-real                          | ✅ PASS (с оговоркой) | `react-native bundle` emit-ит 3.5M JS. Нативная сборка iOS/Android на устройстве — pending (нет симулятора в среде)                         |
| 3. no-any-inflation                    | ✅ PASS               | 0 `any`/`as any`/`@ts-ignore`/`eslint-disable` в src                                                                                        |
| 4. no-empty-tests                      | N/A                   | тесты исключены                                                                                                                             |

## Remaining (для следующих прогонов / продуктового MVP)

- [ ] Исключить msw из production-бандла (metro resolver / dev-only entry) — сейчас 876K→3.5M
- [ ] Нативная линковка (`pod install` / gradle sync) + сборка на устройстве/симуляторе
- [ ] Реальный backend вместо MSW; боевой PSP вместо псевдо-токена; реальный OTP-flow
- [ ] Prod-провайдер карт/гео (снять rate-limit Nominatim/OSRM)
- [ ] Продуктовый MVP: real-time трекинг, водительская часть, push-уведомления
- [ ] (опц.) Вернуть тесты: Jest + @testing-library/react-native + Maestro

## Recommendation

- [x] Каркас senior-2026 готов, gate зелёный, Score 83/100 (цель достигнута).
- [x] **Запушено, PR создан и смержено в `master`** по решению владельца (2026-06-17).
- [ ] Перед боевым запуском — выполнить блок Remaining (продуктовый MVP кратно больше каркаса).
