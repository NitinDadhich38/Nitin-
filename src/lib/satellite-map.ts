/**
 * Slippy-map tile math (Web Mercator) — enough to lay out a grid of ArcGIS
 * World Imagery satellite tiles centered on a lat/lng, with zero extra
 * dependencies. No API key: server.arcgisonline.com serves public XYZ tiles,
 * the same imagery source the old pranglobal.com project pages used for
 * their Leaflet map. See components/marketplace/satellite-map.tsx.
 */

export const TILE_SIZE = 256;

export type TilePosition = {
  /** Tile column/row at the given zoom. */
  tileX: number;
  tileY: number;
  /** Pixel offset of the point within its tile (0–256). */
  offsetX: number;
  offsetY: number;
};

export function project(lat: number, lng: number, zoom: number): TilePosition {
  const scale = TILE_SIZE * 2 ** zoom;
  const worldX = ((lng + 180) / 360) * scale;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const worldY =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;

  const tileX = Math.floor(worldX / TILE_SIZE);
  const tileY = Math.floor(worldY / TILE_SIZE);
  return {
    tileX,
    tileY,
    offsetX: worldX - tileX * TILE_SIZE,
    offsetY: worldY - tileY * TILE_SIZE,
  };
}

export function arcgisTileUrl(z: number, x: number, y: number): string {
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
}

export type MapGrid = {
  zoom: number;
  cols: number;
  rows: number;
  canvasWidth: number;
  canvasHeight: number;
  /** Marker position in canvas pixels — center the pin's tip here. */
  markerX: number;
  markerY: number;
  tiles: { x: number; y: number; z: number; left: number; top: number; url: string }[];
};

/**
 * Build a cols×rows tile grid centered on (lat, lng). Odd dimensions keep a
 * true center tile so the marker math stays simple.
 */
export function buildMapGrid(
  lat: number,
  lng: number,
  zoom: number,
  cols = 5,
  rows = 4,
): MapGrid {
  const { tileX, tileY, offsetX, offsetY } = project(lat, lng, zoom);
  const halfCols = Math.floor(cols / 2);
  const halfRows = Math.floor(rows / 2);
  const maxTile = 2 ** zoom;

  const tiles: MapGrid["tiles"] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = ((tileX - halfCols + col) % maxTile + maxTile) % maxTile;
      const y = tileY - halfRows + row;
      if (y < 0 || y >= maxTile) continue;
      tiles.push({
        x,
        y,
        z: zoom,
        left: col * TILE_SIZE,
        top: row * TILE_SIZE,
        url: arcgisTileUrl(zoom, x, y),
      });
    }
  }

  return {
    zoom,
    cols,
    rows,
    canvasWidth: cols * TILE_SIZE,
    canvasHeight: rows * TILE_SIZE,
    markerX: halfCols * TILE_SIZE + offsetX,
    markerY: halfRows * TILE_SIZE + offsetY,
    tiles,
  };
}
