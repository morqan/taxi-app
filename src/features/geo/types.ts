// Гео-типы. Изолированы от backend-DTO (@/api/types) — это внешние OSM-сервисы, не наш API.

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place {
  label: string;
  position: LatLng;
}

export interface RouteResult {
  distanceMeters: number;
  durationSeconds: number;
  geometry: LatLng[];
}

/**
 * Адаптер геопровайдера. Реализация по умолчанию — бесплатный OSM-стек (Nominatim + OSRM).
 * Интерфейс позволяет подменить провайдера в prod (платный/self-hosted) без правок экранов.
 */
export interface GeoProvider {
  geocode(query: string): Promise<Place[]>;
  reverseGeocode(point: LatLng): Promise<Place | null>;
  route(from: LatLng, to: LatLng): Promise<RouteResult | null>;
}
