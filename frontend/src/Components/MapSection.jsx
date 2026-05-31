import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🌟 終極解法：強制指定 Icon 使用外部圖床
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
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
            icon={customIcon} /* 🌟 套用自訂 Icon */
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