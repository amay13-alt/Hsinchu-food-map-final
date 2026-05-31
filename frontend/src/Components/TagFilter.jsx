// TagFilter.jsx 完整內容
import React from "react";

function TagFilter({ tags, selectedTag, setSelectedTag }) {
  // 防呆：確保 tags 是一個陣列，如果沒有傳入則預設為空陣列
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
      <button
        onClick={() => setSelectedTag("全部")}
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid #d1d5db",
          background: selectedTag === "全部" ? "#475569" : "#fff",
          color: selectedTag === "全部" ? "#fff" : "#111827",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.85rem"
        }}
      >
        全部標籤
      </button>

      {safeTags.map((tag) => (
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
            fontWeight: "600",
            fontSize: "0.85rem"
          }}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;