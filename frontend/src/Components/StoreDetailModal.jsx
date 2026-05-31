import React from "react";

function StoreDetailModal({ store, onClose }) {
  if (!store) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content standard-card-style"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "480px", width: "90%" }}
      >
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>

        {store.logo && (
          <img
            src={store.logo}
            alt={store.name}
            className="modal-logo-centered"
          />
        )}

        <h2>{store.name}</h2>

        {store.category && (
          <span className="category-tag-modal">{store.category}</span>
        )}

        <div style={{ margin: "12px 0", textAlign: "left" }}>
          {store.area && <p>📍 {store.area}</p>}
          {store.address && <p>🏠 {store.address}</p>}
          {store.phone && <p>📞 {store.phone}</p>}
          {store.hours && <p>🕐 {store.hours}</p>}
          {store.rating && <p>⭐ {store.rating}</p>}
        </div>

        {store.tags && store.tags.length > 0 && (
          <div style={{ marginTop: "12px", textAlign: "left" }}>
            <p style={{ marginBottom: "8px", fontWeight: "700" }}>標籤：</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {store.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "#eef2ff",
                    color: "#334155",
                    fontSize: "0.8rem",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {store.description && (
          <p style={{ marginTop: "12px", color: "#666", fontSize: "14px" }}>
            {store.description}
          </p>
        )}

        {store.source_url && (
          <div style={{ marginTop: "15px", textAlign: "left" }}>
            <a 
              href={store.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                background: "#475569",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "bold"
              }}
            >
              🔗 查看店家網站
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreDetailModal;