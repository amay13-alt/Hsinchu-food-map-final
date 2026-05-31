import { useState } from "react";
import { addPlace } from "../api/places";

function AddPlacePage() {
  const [form, setForm] = useState({
    name: "",
    area: "",
    category: "",
    address: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlace(form);
      alert("新增成功");
    } catch (error) {
      console.error(error);
      alert("新增失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新增店家</h2>
      <input name="name" placeholder="店名" onChange={handleChange} />
      <input name="area" placeholder="區域" onChange={handleChange} />
      <input name="category" placeholder="品類" onChange={handleChange} />
      <input name="address" placeholder="地址" onChange={handleChange} />
      <input name="lat" placeholder="緯度" onChange={handleChange} />
      <input name="lng" placeholder="經度" onChange={handleChange} />
      <button type="submit">送出</button>
    </form>
  );
}

export default AddPlacePage;