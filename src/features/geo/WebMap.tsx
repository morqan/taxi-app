import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { colors } from '@/theme/colors';

import type { LatLng, Place } from './types';

interface WebMapProps {
  center: LatLng;
  markers?: Place[];
  route?: LatLng[];
  height?: number;
}

// Карта рендерится через Leaflet в WebView с бесплатными OSM-тайлами — без нативного map-SDK
// (нулевой риск совместимости). Leaflet грузится с CDN unpkg: офлайн карта будет пустой.
// Для prod с тяжёлой картой — пересмотреть в пользу MapLibre (см. ADR-001).
function buildHtml(center: LatLng, markers: Place[], route: LatLng[]): string {
  const markersJson = JSON.stringify(
    markers.map((m) => ({ lat: m.position.lat, lng: m.position.lng, label: m.label })),
  );
  const routeJson = JSON.stringify(route);
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>html,body,#map{height:100%;margin:0;background:${colors.surface}}</style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var map = L.map('map').setView([${center.lat}, ${center.lng}], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'OpenStreetMap' }).addTo(map);
  var markers = ${markersJson};
  markers.forEach(function (m) { L.marker([m.lat, m.lng]).addTo(map).bindPopup(m.label); });
  var route = ${routeJson};
  if (route.length > 1) {
    var line = L.polyline(route.map(function (p) { return [p.lat, p.lng]; }), { color: '${colors.primary}' }).addTo(map);
    map.fitBounds(line.getBounds(), { padding: [20, 20] });
  } else if (markers.length > 1) {
    var group = L.featureGroup(markers.map(function (m) { return L.marker([m.lat, m.lng]); }));
    map.fitBounds(group.getBounds(), { padding: [40, 40] });
  }
</script>
</body>
</html>`;
}

export function WebMap({ center, markers = [], route = [], height = 220 }: WebMapProps) {
  const html = useMemo(() => buildHtml(center, markers, route), [center, markers, route]);

  return (
    <View style={[styles.container, { height }]}>
      <WebView originWhitelist={['*']} source={{ html }} style={styles.web} scrollEnabled={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  web: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
