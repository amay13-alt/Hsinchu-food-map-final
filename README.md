# 🗺️ 新竹美食地圖 · 沙漠生存日記 (Full-Stack React App)

本系統為前端網頁程式設計期末專案，專門針對新竹地區美食進行多維度檢索與個人飲食追蹤。
系統前端採用 **React (Vite)** 開發，結合 **React Router** 達成流暢的單頁應用 (SPA)，並利用 **Context API** 與 **LocalStorage** 實作跨元件狀態管理與資料持久化；地圖功能完美整合 **React Leaflet**。後端則對接 **Node.js (Express) + MySQL**，同時實作了「前端假資料 (Mock Data) 降級模式」，確保系統在任何環境下皆能完美運行。

---

## ✨ 核心亮點功能 (Key Features)

- 🎲 **今天去哪？ (抽籤系統)**：結合 useMemo 與篩選邏輯，從當前條件下隨機抽取美食，解決選擇障礙。
- 📅 **專屬美食日曆 (飲食紀錄)**：支援上傳圖片、星級評分與自訂標籤。資料透過 `Context API` 共享，並使用瀏覽器 `LocalStorage` 達成資料持久化，重整網頁資料不遺失。
- 🗺️ **動態互動地圖**：整合 Leaflet 地圖，支援 Marker 點擊連動、動態載入店家資訊與商家網站外部連結。
- 🌗 **響應式與深色模式支援**：採用 CSS 變數系統 (CSS Variables)，完美支援系統層級的深淺色切換 (`prefers-color-scheme`) 與手機版 (RWD) 完美適配。

---

## 🛠️ 開發人員與助教本機運行指南

請確保您的電腦已安裝好 **VS Code**、**Node.js 環境** 與 **MySQL Workbench**。

### 🗄️ 第一步：還原 MySQL 資料庫 (若僅需測試前端可跳過此步)

1. 打開 **MySQL Workbench**，進入您的資料庫連線。
2. 點擊左側選單的 **Data Import/Restore**。
3. 選擇 **Import from Self-Contained File**，並選取專案目錄底下的 SQL 備份檔。
4. 在 *Default Schema to Import To* 點擊 **New**，新增一個名為 `food_map_db` (或您設定的名稱) 的 Schema。
5. 點擊右下角 **Start Import** 完成店家資料還原。

### 🚀 第二步：配置並啟動 Application Layer (後端 API)

1. 在 `backend` 資料夾中建立 `.env` 檔案，並依您的本地 MySQL 密碼進行設定：

```env
# 後端伺服器埠號
PORT=3000

# 本地 MySQL 資料庫連線設定
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=您的MySQL密碼  # 👈 請替換成您安裝 MySQL 時設定的密碼
DB_NAME=food_map_db      # 👈 請替換成您還原的 Schema 名稱
DB_PORT=3306
```

2. 使用 VS Code 開啟終端機，切換至後端目錄並安裝依賴套件：
```Bash
cd backend
npm install
```

3. 啟動後端 API 伺服器：
```Bash
node server.js
```
當畫面顯示 `✅ 後端啟動成功：http://localhost:3000 `即代表後端已成功與 MySQL 連線。

### 💻 第三步：啟動 Presentation Layer (前端網頁)
1. 在 VS Code 中開啟「第二個終端機視窗」（請保留後端伺服器持續運行）。

2. 切換至前端目錄並安裝網頁依賴套件：
```Bash
cd frontend
npm install
```
3. 啟動 React 本機開發伺服器：
```Bash
npm run dev
```
4. 按住 `Ctrl` 並點擊終端機顯示的 `http://localhost:5173` 網址，即可進入新竹美食地圖！

### 🌐 關於 Vercel 線上部署的重要說明

本專案已完美部署至 Vercel 提供線上即時預覽。為了在 Serverless 雲端環境中提供最流暢的體驗，本專案實作了雙軌資料模式：

1. 店家列表與地圖：前端 API ( `frontend/src/api/place.js` ) 會自動偵測當前環境。在 Vercel 生產環境中，系統會自動切換讀取 `mockData.json` 進行展示，確保在無後端連線的狀態下，地圖檢索與抽籤功能依然 100% 運作正常。

2. 美食日曆功能：日曆的新增與刪除紀錄完全依賴瀏覽器的 `LocalStorage` 實作。評委在線上版測試新增紀錄後，關閉網頁再次開啟，紀錄依然會保留於您的設備中！

祝您在新竹美食沙漠中，找到屬於您的綠洲！🌵🍔