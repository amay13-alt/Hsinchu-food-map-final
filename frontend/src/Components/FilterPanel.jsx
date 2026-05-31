// FilterPanel.jsx 檔案內容

function FilterPanel({
  searchText, setSearchText,
  selectedCategory, setSelectedCategory,
  selectedArea, setSelectedArea,
  onRandomSelect // <-- 1. 接收父元件傳來的函式
}) {
  return (
    <div className="controls-box-left">
      <input
        className="search-input-modern-fluid"
        type="text"
        placeholder="搜尋店名、品類或區域..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="dropdowns-row-flex">
        <div className="filter-field-modern">
          <label>品類</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="全部">全部品類</option>
            <option value="火鍋">火鍋</option>
            <option value="小吃">小吃</option>
            <option value="便當">便當</option>
            <option value="異國料理">異國料理</option>
          </select>
        </div>
        <div className="filter-field-modern">
          <label>區域</label>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            <option value="全部">全部區域</option>
            <option value="巨城周邊">巨城周邊</option>
            <option value="清大夜市">清大夜市</option>
            <option value="城隍廟">城隍廟</option>
            <option value="動物園">動物園</option>
          </select>
        </div>
      </div>
      <div className="control-buttons-row">
        {/* 2. 綁定 onClick 事件 */}
        <button className="btn-action-draw" onClick={onRandomSelect}>
          🎲 今天去哪？
        </button>
        <button
          className="btn-action-reset"
          onClick={() => {
            setSearchText("");
            setSelectedCategory("全部");
            setSelectedArea("全部");
          }}
        >
          重置條件
        </button>
      </div>
    </div>
  );
}

export default FilterPanel;