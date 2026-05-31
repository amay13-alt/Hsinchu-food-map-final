import { useState, useContext } from "react";
import { RecordContext } from "../App"; 

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { records, deleteRecord } = useContext(RecordContext);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  const padMonth = String(month + 1).padStart(2, '0');

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      {/* 導覽列 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <button className="lang-toggle" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀ 上個月</button>
        <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800" }}>{year} 年 {month + 1} 月</h2>
        <button className="lang-toggle" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>下個月 ▶</button>
      </div>

      {/* 星期幾的標題 (強制 7 欄 Grid) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", marginBottom: "12px" }}>
        {weekDays.map((d) => (
          <div key={d} style={{ fontWeight: "bold", color: "hsl(var(--muted-foreground))", textAlign: "center" }}>
            {d}
          </div>
        ))}
      </div>

      {/* 日曆主體格子 (強制 7 欄 Grid + 強制高度防止塌陷) */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(7, 1fr)", 
        gridAutoRows: "minmax(130px, auto)", /* 🌟 救星屬性直接寫在這裡 */
        gap: "10px" 
      }}>
        {days.map((day, index) => {
          const padDay = day ? String(day).padStart(2, '0') : "";
          const dateKey = day ? `${year}-${padMonth}-${padDay}` : "";
          const dayRecords = Array.isArray(records[dateKey]) ? records[dateKey] : [];

          return (
            <div key={index} style={{
              background: day ? "hsl(var(--card))" : "hsl(var(--background))",
              border: "1px solid hsl(var(--ui-border))",
              borderRadius: "8px",
              padding: "8px",
              textAlign: "left",
              opacity: day ? 1 : 0.5,
              boxSizing: "border-box",
              overflow: "hidden"
            }}>
              {day && (
                <>
                  <div style={{ fontWeight: "800", marginBottom: "8px" }}>{day}</div>
                  {dayRecords.map((record, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedRecord({ ...record, dateKey: dateKey, id: record.id })}
                      style={{
                        background: "hsl(var(--background))", padding: "4px 8px", borderRadius: "4px",
                        marginBottom: "4px", cursor: "pointer", border: "1px solid hsl(var(--ui-border))",
                        fontSize: "0.85rem"
                      }}
                    >
                      {record.emoji} {record.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 彈窗 Modal 保持不變 */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="standard-card-style" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-x" onClick={() => setSelectedRecord(null)}>×</button>
            {selectedRecord.image && (
              <img src={selectedRecord.image} alt="紀錄" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px", marginBottom: "10px" }} />
            )}
            <h3 className="map-modal-title">{selectedRecord.name}</h3>
            <p className="modal-info-box-clean">心得：{selectedRecord.item}</p>
            <div style={{ marginTop: "10px" }} className="card-rating">{selectedRecord.rating}</div>
            <button 
              style={{ background: "#ef4444", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", marginTop: "20px" }}
              onClick={(e) => { 
                e.stopPropagation(); 
                deleteRecord(selectedRecord.dateKey, selectedRecord.id); 
                setSelectedRecord(null); 
              }}
            >
              刪除紀錄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}