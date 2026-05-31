const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// 路由導入 (將 categories 和 areas 移到獨立檔案會更好，這裡先保持簡潔但加入錯誤處理)
app.use('/api/places', require('./routes/places'));

// 修正：補上 try-catch 防止資料庫錯誤導致伺服器崩潰
app.get('/api/categories', async (req, res) => {
  try {
    const pool = require('./db');
    const [rows] = await pool.query('SELECT * FROM CATEGORY');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/areas', async (req, res) => {
  try {
    const pool = require('./db');
    const [rows] = await pool.query('SELECT * FROM AREA');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ 後端啟動成功：http://localhost:${PORT}`);
});