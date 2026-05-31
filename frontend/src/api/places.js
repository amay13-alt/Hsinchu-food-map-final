import mockData from './mockData.json';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export const fetchPlaces = async () => {
  // 如果是部署版本 (Production)，直接讀取假資料
  if (import.meta.env.MODE === 'production') {
    return mockData;
  }

  // 開發模式下嘗試連線後端，失敗則自動切換回假資料 (雙重保險)
  try {
    const res = await fetch(`${BASE_URL}/places`);
    if (!res.ok) throw new Error('Backend offline');
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data ?? []);
  } catch (err) {
    console.warn("後端連線失敗，自動使用模擬資料");
    return mockData;
  }
};

export const fetchPlaceById = async (id) => {
  if (import.meta.env.MODE === 'production') {
    return mockData.find(p => p.place_id === id) || null;
  }
  
  try {
    const res = await fetch(`${BASE_URL}/places/${id}`);
    if (!res.ok) throw new Error();
    const json = await res.json();
    return json.data ?? json;
  } catch (e) {
    return mockData.find(p => p.place_id === id) || null;
  }
};

export const addPlace = async (placeData) => {
  // Demo 階段若後端沒開，可直接跳過儲存邏輯，或 console log 顯示已接收
  console.log("新增店家請求 (Demo 模式):", placeData);
  return { success: true, ...placeData };
};