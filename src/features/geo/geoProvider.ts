import type { GeoProvider, LatLng, Place, RouteResult } from './types';

// Публичные OSM-сервисы. ВАЖНО (rate-limit): Nominatim/OSRM бесплатны для dev/низкого трафика,
// требуют корректный User-Agent и НЕ годятся для prod-нагрузки — там нужен self-host или платный
// тариф. Подмена провайдера — через интерфейс GeoProvider, без правок экранов.
const NOMINATIM = 'https://nominatim.openstreetmap.org';
const OSRM = 'https://router.project-osrm.org';
const USER_AGENT = 'taxi-app/0.0.1 (dev)';

// Минимальные формы ответов внешних API (типизируем только используемые поля).
interface NominatimPlace {
  display_name: string;
  lat: string;
  lon: string;
}

interface OsrmRoute {
  distance: number;
  duration: number;
  geometry: { coordinates: [number, number][] };
}

interface OsrmResponse {
  routes?: OsrmRoute[];
}

export const osmGeoProvider: GeoProvider = {
  async geocode(query) {
    const url = `${NOMINATIM}/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      return [];
    }
    const data = (await res.json()) as NominatimPlace[];
    return data.map((item) => ({
      label: item.display_name,
      position: { lat: Number(item.lat), lng: Number(item.lon) },
    }));
  },

  async reverseGeocode(point) {
    const url = `${NOMINATIM}/reverse?format=json&lat=${point.lat}&lon=${point.lng}`;
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as Partial<NominatimPlace>;
    if (!data.display_name) {
      return null;
    }
    return { label: data.display_name, position: point };
  },

  async route(from, to) {
    // OSRM ждёт координаты в порядке lng,lat
    const coords = `${from.lng},${from.lat};${to.lng},${to.lat}`;
    const url = `${OSRM}/route/v1/driving/${coords}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as OsrmResponse;
    const first = data.routes?.[0];
    if (!first) {
      return null;
    }
    return {
      distanceMeters: first.distance,
      durationSeconds: first.duration,
      // GeoJSON отдаёт [lng, lat] — переворачиваем в наш LatLng
      geometry: first.geometry.coordinates.map(([lng, lat]): LatLng => ({ lat, lng })),
    } satisfies RouteResult;
  },
};

// Точка переключения провайдера для prod (например, платный геокодер/роутер).
export const geoProvider: GeoProvider = osmGeoProvider;

export type { GeoProvider, LatLng, Place, RouteResult };
