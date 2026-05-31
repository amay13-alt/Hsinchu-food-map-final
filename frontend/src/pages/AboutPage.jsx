import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>關於新竹美食地圖 🗺️</h1>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
        新竹美食地圖是一個新竹地區的美食地圖應用，整合在地店家資訊，
        讓你可以快速搜尋、篩選、找到今天最想吃的那一餐。
      </p>
      <p style={{ marginTop: '1rem', fontSize: '1rem', lineHeight: '1.8', color: '#555' }}>
        資料來源涵蓋各大連鎖品牌與在地獨立店家，持續更新中。
      </p>
      {/* 🌟 改成 Link */}
      <Link to="/" style={{ display: 'inline-block', marginTop: '2rem', padding: '10px 20px', background: '#0ea5e9', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
        ← 回到地圖
      </Link>
    </div>
  );
}

export default AboutPage;