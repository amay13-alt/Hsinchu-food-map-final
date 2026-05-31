import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecordContext } from "../App"; // 🌟 引入剛剛建好的 RecordContext

export default function UploadPage() {
  const navigate = useNavigate();
  const { addRecord } = useContext(RecordContext);
  
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today); 
  const [storeName, setStoreName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [selectedTags, setSelectedTags] = useState([]);
  const availableTags = ["🍱 正餐", "🍰 甜點", "🧋 飲料", "💸 便宜", "👑 聚餐首選", "🌙 宵夜"];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName) {
      alert("⚠️ 請至少輸入店家名稱！");
      return;
    }

    // 判斷要顯示哪個 Emoji (簡單邏輯：根據選擇的標籤)
    let emoji = "🍽️";
    if (selectedTags.includes("🧋 飲料")) emoji = "🧋";
    else if (selectedTags.includes("🍰 甜點")) emoji = "🍰";
    else if (selectedTags.includes("🍱 正餐")) emoji = "🍱";

    // 🌟 將資料正式寫入全域狀態！
    addRecord(date, {
      name: storeName,
      item: review || "無心得", 
      emoji: emoji,
      rating: "⭐".repeat(rating),
      image: imagePreview
    });
    
    alert(`✅ 成功新增紀錄並存入資料庫！\n前往日曆查看成果吧！`);
    navigate("/calendar"); 
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "hsl(var(--card))", padding: "30px", borderRadius: "var(--radius)", border: "1px solid hsl(var(--ui-border))", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", width: "100%", maxWidth: "500px", textAlign: "left" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "1.6rem", fontWeight: "800", color: "hsl(var(--foreground))" }}>✍️ 新增飲食紀錄</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>用餐日期</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: "12px", borderRadius: "6px", border: "1px solid hsl(var(--ui-border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: "0.95rem", outline: "none", cursor: "pointer" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>店家 / 品項名稱</label>
            <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="例如：星巴克 焦糖瑪奇朵" style={{ padding: "12px", borderRadius: "6px", border: "1px solid hsl(var(--ui-border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: "0.95rem", outline: "none" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>美味評分</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} style={{ background: "none", border: "none", fontSize: "1.8rem", cursor: "pointer", color: star <= rating ? "#eab308" : "hsl(var(--ui-border))", transition: "color 0.2s" }}>★</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>個人標籤</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {availableTags.map(tag => (
                <button key={tag} type="button" onClick={() => toggleTag(tag)} style={{ padding: "6px 12px", borderRadius: "999px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", border: "1px solid", borderColor: selectedTags.includes(tag) ? "#475569" : "hsl(var(--ui-border))", background: selectedTags.includes(tag) ? "#475569" : "hsl(var(--background))", color: selectedTags.includes(tag) ? "white" : "hsl(var(--muted-foreground))" }}>{tag}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>用餐心得</label>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="3" placeholder="說點什麼吧..." style={{ padding: "12px", borderRadius: "6px", border: "1px solid hsl(var(--ui-border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontSize: "0.95rem", outline: "none", resize: "vertical" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "700", color: "hsl(var(--muted-foreground))" }}>
              上傳美食照片 (點擊框框選擇)
            </label>
            
            {imagePreview ? (
              <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden", border: "1px solid hsl(var(--ui-border))" }}>
                <img src={imagePreview} alt="預覽" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button type="button" onClick={() => setImagePreview(null)} style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer" }}>✕</button>
              </div>
            ) : (
              <label style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "150px",
                border: "2px dashed #94a3b8", /* 🌟 加深虛線顏色 */
                borderRadius: "8px", cursor: "pointer",
                background: "hsl(var(--background))", color: "#475569", fontWeight: "600",
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#e2e8f0"}
              onMouseOut={(e) => e.currentTarget.style.background = "hsl(var(--background))"}
              >
                <span style={{ fontSize: "2rem", marginBottom: "5px" }}>📷</span>
                <span>點擊上傳照片</span>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
            )}
          </div>

          <button type="submit" style={{ marginTop: "10px", background: "#475569", color: "white", border: "none", padding: "14px", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "1rem" }}>儲存紀錄</button>
        </form>
      </div>
    </div>
  );
}