const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/places — 取得所有店家（地圖 + 列表用）
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.place_id AS id,
        p.name,
        p.address,
        p.phone,
        p.lat,
        p.lng,
        p.source_url,
        p.is_user_added,
        c.category_name AS category,
        c.category_slug,
        a.area_name AS area,
        a.district,
        GROUP_CONCAT(t.tag_name ORDER BY t.tag_id SEPARATOR '||') AS tag_names
      FROM PLACE p
      JOIN CATEGORY c ON p.category_id = c.category_id
      JOIN AREA a ON p.area_id = a.area_id
      LEFT JOIN PLACE_TAG pt ON p.place_id = pt.place_id
      LEFT JOIN TAG t ON pt.tag_id = t.tag_id
      GROUP BY
        p.place_id, p.name, p.address, p.phone,
        p.lat, p.lng, p.source_url, p.is_user_added,
        c.category_name, c.category_slug,
        a.area_name, a.district
      ORDER BY p.place_id
    `);

    const formattedRows = rows.map((row) => ({
      ...row,
      tags: row.tag_names ? row.tag_names.split('||') : [],
    }));

    res.json({ success: true, data: formattedRows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/places/:id — 單一店家詳情（點 marker / modal 用）
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.place_id AS id,
        p.name,
        p.address,
        p.phone,
        p.lat,
        p.lng,
        p.source_url,
        p.is_user_added,
        p.created_at,
        c.category_name AS category,
        c.category_slug,
        a.area_name AS area,
        a.district,
        a.description AS area_description,
        GROUP_CONCAT(t.tag_name ORDER BY t.tag_id SEPARATOR '||') AS tag_names
      FROM PLACE p
      JOIN CATEGORY c ON p.category_id = c.category_id
      JOIN AREA a ON p.area_id = a.area_id
      LEFT JOIN PLACE_TAG pt ON p.place_id = pt.place_id
      LEFT JOIN TAG t ON pt.tag_id = t.tag_id
      WHERE p.place_id = ?
      GROUP BY
        p.place_id, p.name, p.address, p.phone,
        p.lat, p.lng, p.source_url, p.is_user_added, p.created_at,
        c.category_name, c.category_slug,
        a.area_name, a.district, a.description
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Not found' });
    }

    const row = rows[0];
    const formattedRow = {
      ...row,
      tags: row.tag_names ? row.tag_names.split('||') : [],
    };

    res.json({ success: true, data: formattedRow });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/places — 使用者新增店家
router.post('/', async (req, res) => {
  const {
    name,
    category_id,
    district,
    area_id,
    address,
    phone,
    lat,
    lng,
    source_url
  } = req.body;

  if (!name || !category_id || !lat || !lng) {
    return res.status(400).json({
      success: false,
      error: '缺少必填欄位 (name, category_id, lat, lng)'
    });
  }

  try {
    const [last] = await pool.query(
      'SELECT place_id FROM PLACE ORDER BY place_id DESC LIMIT 1'
    );

    const lastNum = last.length
      ? parseInt(last[0].place_id.replace('P', ''))
      : 0;

    const newId = 'P' + String(lastNum + 1).padStart(3, '0');

    await pool.query(
      `INSERT INTO PLACE 
        (place_id, name, category_id, district, area_id, address, phone, lat, lng, source_url, is_user_added)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        newId,
        name,
        category_id,
        district || '東區',
        area_id || 'A002',
        address || null,
        phone || null,
        lat,
        lng,
        source_url || null
      ]
    );

    res.json({ success: true, place_id: newId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;