DROP TABLE IF EXISTS PLACE_TAG;
DROP TABLE IF EXISTS TAG;
DROP TABLE IF EXISTS PLACE;
DROP TABLE IF EXISTS AREA;
DROP TABLE IF EXISTS CATEGORY;

CREATE TABLE CATEGORY (
  category_id VARCHAR(10) PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL,
  category_slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE AREA (
  area_id VARCHAR(10) PRIMARY KEY,
  area_name VARCHAR(50) NOT NULL,
  area_slug VARCHAR(50) NOT NULL UNIQUE,
  district VARCHAR(20) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE PLACE (
  place_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id VARCHAR(10) NOT NULL,
  district VARCHAR(20) NOT NULL,
  area_id VARCHAR(10) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  source_url VARCHAR(500),
  is_user_added TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id),
  FOREIGN KEY (area_id) REFERENCES AREA(area_id)
);

CREATE TABLE TAG (
  tag_id VARCHAR(10) PRIMARY KEY,
  tag_name VARCHAR(50) NOT NULL,
  tag_slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE PLACE_TAG (
  place_id VARCHAR(10) NOT NULL,
  tag_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (place_id, tag_id),
  FOREIGN KEY (place_id) REFERENCES PLACE(place_id),
  FOREIGN KEY (tag_id) REFERENCES TAG(tag_id)
);

INSERT INTO CATEGORY (category_id, category_name, category_slug) VALUES
('C001', '火鍋', 'hotpot'),
('C002', '便當', 'bento'),
('C003', '小吃', 'snack'),
('C004', '異國料理', 'international'),
('C005', '宵夜', 'late-night'),
('C006', '點心', 'dessert');

INSERT INTO AREA (area_id, area_name, area_slug, district, description) VALUES
('A001', '城隍廟', 'chenghuang-temple', '北區', '廟埕與周邊小吃商圈'),
('A002', '動物園', 'zoo', '東區', '食品路、新竹公園、動物園周邊'),
('A003', '清大夜市', 'nthu-night-market', '東區', '清大、建功路、學府路生活圈'),
('A004', '巨城周邊', 'big-city', '東區', '巨城與民權路、忠孝路周邊'),
('A005', '站前商圈', 'station-front', '東區', '東門圓環、火車站前與西大路周邊'),
('A006', '將軍村', 'jiangjun-village', '東區', '將軍村與金城一路周邊');

INSERT INTO PLACE (place_id, name, category_id, district, area_id, address, phone, lat, lng, source_url, is_user_added) VALUES
('P001', '石二鍋', 'C001', '東區', 'A004', '300新竹市東區忠孝路279-7號', '03-5751118', 24.8015, 120.9898, 'https://www.12hotpot.com.tw/', 0),
('P002', '六扇門', 'C001', '東區', 'A001', '新竹市民富街253號', '03-5242888', 24.8060, 120.9608, 'https://supertaste.tvbs.com.tw/food/358422', 0),
('P003', '八二親食將軍村', 'C001', '東區', 'A006', '新竹市東區金城一路67號', '03-5725566', 24.8009, 120.9796, 'https://www.saydigi.com/2024/11/1437945.html', 0),
('P004', '億品鍋', 'C001', '東區', 'A002', '新竹市東區食品路262號', '03-5620262', 24.7926, 120.9715, 'https://myre.life/store/XXX3088?lang=zh-TW', 0),
('P005', '禾豐自助餐', 'C002', '東區', 'A002', '300新竹市東區食品路193號', '03-5750382', 24.7907, 120.9726, 'https://footinder.com.tw/%E6%96%B0%E7%AB%B9%E5%B8%82%E6%9D%B1%E5%8D%80/131216/', 0),
('P006', '廟口鴨香飯', 'C003', '北區', 'A001', '新竹市北區中山路142號', '03-5231190', 24.8042, 120.9669, 'https://villa.com.tw/%E6%96%B0%E7%AB%B9%E5%BB%9F%E5%8F%A3%E9%B4%A8%E9%A6%99%E9%A3%AF/', 0),
('P007', '黃媽媽豆瓣麵', 'C003', '東區', 'A003', '新竹市東區學府路441巷11號', '03-5750128', 24.7867, 120.9964, 'https://tourism.hccg.gov.tw/chtravel/app/travel/view?id=30&serno=9a6edbc0-8fb6-453f-a303-03b690e3577b&module=travel', 0),
('P008', '阿美泰泰', 'C004', '東區', 'A004', '新竹市民權路120號', '03-5420180', 24.8134, 120.9760, 'https://vivawei.tw/amei-tai-tai/', 0),
('P009', '秋賢越南美食', 'C004', '東區', 'A002', '新竹市東區東南街146號', '0979-592138', 24.7951, 120.9729, 'https://gototravel.tw/hsinchu-qiu-xian-vietnam-restaurant/', 0),
('P010', '小鵲幸車輪餅', 'C006', '東區', 'A002', '新竹市東南街118號', NULL, 24.7980, 120.9713, 'https://www.instagram.com/alittlehappinesscake/', 0),
('P011', '升一排骨', 'C002', '東區', 'A003', '新竹市東區建功一路58號', NULL, 24.7968, 120.9981, 'https://www.ubereats.com/tw/store/%E5%8D%87%E4%B8%80%E6%8E%92%E9%AA%A8/jwlUH1inVZCyXaCyVCnVtQ', 0),
('P012', '伊村燒肉飯', 'C002', '東區', 'A002', '新竹市南大路267號', NULL, 24.7902, 120.9658, 'https://thudadai.pixnet.net/blog/posts/5038205462', 0),
('P013', '龍滿排骨', 'C002', '東區', 'A003', '新竹市東山街2號', '03-5750690', 24.7965, 120.9973, 'https://www.facebook.com/cutier2000/posts/%E9%BE%8D%E6%BB%BF%E6%8E%92%E9%AA%A8%E6%96%B0%E7%AB%B9%E5%B8%82%E6%9D%B1%E5%B1%B1%E8%A1%972%E8%99%9F103-5750690-%E6%98%9F%E6%9C%9F%E6%97%A5/', 0),
('P014', '公園黑乾麵', 'C003', '東區', 'A002', '新竹市東區體育街82號', '03-5622527', 24.7984, 120.9837, 'https://tourism.hccg.gov.tw/chtravel/app/travel/view?id=30&serno=f118a333-17a2-4015-b70a-1f584529bb0b&module=travel', 0),
('P015', '吉米洋食屋', 'C004', '東區', 'A002', '新竹市東區食品路？', NULL, 24.7896, 120.9690, 'https://www.facebook.com/jimmy5745631/?locale=zh_TW', 0),
('P016', '永和豆漿大王', 'C005', '東區', 'A003', '新竹市建功路45號', '03-5737838', 24.7970, 120.9945, 'https://blog.pklife.tw/2020/08/hsinchu-yonghe.html', 0),
('P017', '歐爹', 'C005', '北區', 'A005', 'Linsen Road & Zhonghua Road Section 3, 88號, North District, Hsinchu', NULL, 24.8136, 120.9685, 'https://www.ubereats.com/tw/store/%E6%AD%90%E7%88%B9%E6%97%A9%E5%8D%88%E9%A4%90/qoGZUvW5SnuPEVw9KKA2ng', 0),
('P018', '好豆味冰沙豆花', 'C006', '東區', 'A005', '新竹市東區勝利路6號', '03-5232860', 24.8044, 120.9710, 'https://upssmile.com/173586/douweidouhuadian', 0),
('P019', '小木屋鬆餅', 'C006', '東區', 'A003', '新竹市大學路1001號；新竹市東門街96號；新竹市光復路1段360-21號', NULL, 24.7860, 120.9995, 'https://shinemood2006.com/shop.php', 0),
('P020', 'RT Baker House', 'C006', '東區', 'A004', '新竹市多分店', NULL, 24.8016, 120.9711, 'https://www.rt-bakery.com.tw', 0),
('P021', '飴棠', 'C006', '東區', 'A005', '新竹市東區西大路99號', '03-6663387', 24.7963, 120.9660, 'https://3yboy.tw/yeetang/', 0);

INSERT INTO TAG (tag_id, tag_name, tag_slug) VALUES
('T001', '平價', 'cheap'),
('T002', '聚餐', 'group-dining'),
('T003', '學生最愛', 'student-friendly'),
('T004', '排隊名店', 'popular'),
('T005', '宵夜推薦', 'late-night'),
('T006', '甜點控', 'dessert-lover'),
('T007', '異國風味', 'international-flavor'),
('T008', '在地老店', 'local-classic'),
('T009', '份量大', 'large-portion'),
('T010', '約會推薦', 'date-spot');

INSERT INTO PLACE_TAG (place_id, tag_id) VALUES
('P001', 'T001'),
('P001', 'T002'),
('P001', 'T009'),

('P002', 'T001'),
('P002', 'T002'),
('P002', 'T009'),

('P003', 'T002'),
('P003', 'T010'),

('P004', 'T001'),
('P004', 'T002'),

('P005', 'T001'),
('P005', 'T009'),
('P005', 'T003'),

('P006', 'T004'),
('P006', 'T008'),
('P006', 'T009'),

('P007', 'T003'),
('P007', 'T008'),

('P008', 'T007'),
('P008', 'T010'),

('P009', 'T007'),
('P009', 'T001'),

('P010', 'T006'),
('P010', 'T003'),

('P011', 'T003'),
('P011', 'T001'),
('P011', 'T009'),

('P012', 'T001'),
('P012', 'T009'),

('P013', 'T003'),
('P013', 'T009'),

('P014', 'T008'),
('P014', 'T001'),

('P015', 'T007'),
('P015', 'T010'),

('P016', 'T005'),
('P016', 'T003'),

('P017', 'T005'),
('P017', 'T001'),

('P018', 'T006'),
('P018', 'T010'),

('P019', 'T006'),
('P019', 'T003'),

('P020', 'T006'),
('P020', 'T010'),

('P021', 'T006'),
('P021', 'T010');