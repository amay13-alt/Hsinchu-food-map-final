import "./App.css"; 
import "./index.css"; 
import AboutPage from "./pages/AboutPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { createContext, useState, useEffect } from "react"; 

import Header from "./Components/Header";
import HomePage from "./pages/HomePage";
import Calendar from "./pages/Calendar"; 
import UploadPage from "./pages/UploadPage";  

// 建立 Context
export const RecordContext = createContext();

function App() {
  // 1. 初始化 (Lazy Initialization)：只會在第一次讀取時執行，不會影響效能
  const [records, setRecords] = useState(() => {
    try {
      const savedRecords = localStorage.getItem("foodRecords");
      if (savedRecords) return JSON.parse(savedRecords);
      
      // 如果是第一次使用，回傳一個符合 Calendar 格式的「假資料物件」
      return {
        "2026-04-20": [
          { id: "P014", name: "公園黑乾麵", item: "豆瓣醬很讚！", rating: "★★★☆", emoji: "🍲" }
        ],
        "2026-05-27": [
          { id: "P001", name: "石二鍋", item: "很好吃！", rating: "★★★★★", emoji: "🍲" }
        ],
        "2026-06-01": [
          { id: "P006", name: "廟口鴨香飯", item: "排隊名店", rating: "★★★★☆", emoji: "🍚" }
        ]
      };
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("foodRecords", JSON.stringify(records));
  }, [records]);

  // 新增紀錄邏輯
  const addRecord = (date, newRecord) => {
    setRecords((prev) => {
      const existing = Array.isArray(prev[date]) ? prev[date] : [];
      const recordWithId = { ...newRecord, id: Date.now() };
      return {
        ...prev,
        [date]: [...existing, recordWithId]
      };
    });
  };

  // 刪除紀錄邏輯
  const deleteRecord = (date, id) => {
    setRecords((prev) => {
      const dayRecords = prev[date] || [];
      return {
        ...prev,
        [date]: dayRecords.filter(record => record.id !== id)
      };
    });
  };

  return (
    <RecordContext.Provider value={{ records, addRecord, deleteRecord }}>
      <BrowserRouter>
        <Header /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </RecordContext.Provider>
  );
}

export default App;