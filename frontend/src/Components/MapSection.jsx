import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 修正 Leaflet 預設 marker 圖示消失的問題
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapSection({ stores, selectedStore, setSelectedStore }) {
  return (
    <MapContainer
      center={[24.8, 120.97]}
      zoom={13}
      style={{ height: "550px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {stores.map((store, index) => {
        if (!store.lat || !store.lng) return null;

        return (
          <Marker
            key={store.id ?? index}
            position={[store.lat, store.lng]}
            eventHandlers={{
              click: () => setSelectedStore(store),
            }}
          >
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.area}
              {store.source_url && (
                <>
                  <br />
                  <a href={store.source_url} target="_blank" rel="noopener noreferrer">查看網站</a>
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapSection;