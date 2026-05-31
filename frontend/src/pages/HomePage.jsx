import { useMemo, useState, useEffect } from "react";
import FilterPanel from "../Components/FilterPanel";
import MapSection from "../Components/MapSection.jsx";
import StoreDetailModal from "../Components/StoreDetailModal";
import StoreListSection from "../Components/StoreListSection";
import { fetchPlaces } from "../api/places";

export default function HomePage() {
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedArea, setSelectedArea] = useState("全部");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedTag, setSelectedTag] = useState("全部");

  useEffect(() => {
    fetchPlaces()
      .then((data) => setStores(data))
      .catch((err) => console.error("載入失敗:", err));
  }, []);

  // 從所有店家資料中整理出不重複標籤
  const allTags = useMemo(() => {
    const tagSet = new Set();
    stores.forEach((store) => {
      if (Array.isArray(store.tags)) {
        store.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [stores]);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchText =
        store.name?.includes(searchText) ||
        store.area?.includes(searchText) ||
        store.tags?.some((tag) => tag.includes(searchText));

      const matchCategory =
        selectedCategory === "全部" || store.category === selectedCategory;

      const matchArea =
        selectedArea === "全部" || store.area === selectedArea;

      const matchTag =
        selectedTag === "全部" || store.tags?.includes(selectedTag);

      return matchText && matchCategory && matchArea && matchTag;
    });
  }, [stores, searchText, selectedCategory, selectedArea, selectedTag]);

  // 新增：抽籤功能
  const handleRandomSelect = () => {
    if (filteredStores.length === 0) {
      alert("目前的篩選條件下沒有符合的店家喔！");
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredStores.length);
    setSelectedStore(filteredStores[randomIndex]);
  };

  return (
    <>
      <div className="top-workspace-row">
        <FilterPanel
          searchText={searchText}
          setSearchText={setSearchText}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          onRandomSelect={handleRandomSelect} // <-- 傳遞抽籤函式給 FilterPanel
        />

        <div className="map-box-right">
          <MapSection
            stores={filteredStores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
          />
        </div>
      </div>

      {/* 標籤篩選列 (這裡只保留標籤，不再有抽籤按鈕) */}
      <div style={{ maxWidth: "1140px", margin: "0 auto 16px auto", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedTag("全部")}
            style={{
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px solid #d1d5db",
              background: selectedTag === "全部" ? "#475569" : "#fff",
              color: selectedTag === "全部" ? "#fff" : "#111827",
              cursor: "pointer",
            }}
          >
            全部標籤
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                border: "1px solid #d1d5db",
                background: selectedTag === tag ? "#475569" : "#fff",
                color: selectedTag === tag ? "#fff" : "#111827",
                cursor: "pointer",
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <StoreListSection
        stores={filteredStores}
        onSelectStore={setSelectedStore}
      />

      <StoreDetailModal
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
      />
    </>
  );
}