import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="centered-header">
      <div className="header-widgets-left">
        <span className="db-indicator connected">
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
            關於我們
          </Link>
        </span>
      </div>
      
      <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>新竹美食地圖</h1>
        <p style={{ margin: 0 }}>沙漠生存日記</p>
      </Link>

      <div className="header-widgets-right" style={{ display: "flex", gap: "10px" }}>
        <Link to="/calendar" className="lang-toggle" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          日曆
        </Link>
        <Link to="/upload" className="lang-toggle" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          新增
        </Link>
      </div>
    </header>
    
  );
}

export default Header;