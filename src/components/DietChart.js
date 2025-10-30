import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DietChart.css";

const dietData = {
  vata: {
    title: "🍲 Vata – The Air Element",
    tips: [
      "Prefer warm, moist, and oily foods like soups and porridges.",
      "Avoid cold, dry, or raw foods.",
      "Include ghee, rice, dates, and nuts in your diet.",
    ],
    bg: "linear-gradient(135deg, #fff4d2, #ffeab6, #ffdf9e)",
  },
  pitta: {
    title: "🥛 Pitta – The Fire Element",
    tips: [
      "Favor cooling foods like cucumbers, melons, and milk products.",
      "Avoid spicy, oily, and fried items.",
      "Include mint, coconut, and coriander in meals.",
    ],
    bg: "linear-gradient(135deg, #d9faff, #b3f0ff, #e0ffff)",
  },
  kapha: {
    title: "🌶️ Kapha – The Earth Element",
    tips: [
      "Eat light, dry, and spicy foods to boost metabolism.",
      "Avoid dairy and fried foods.",
      "Add ginger, turmeric, and leafy greens to your diet.",
    ],
    bg: "linear-gradient(135deg, #eaffd5, #c8facc, #b6f5b0)",
  },
};

const DietChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prakritiType = location.state?.prakritiType?.toLowerCase() || "vata";
  const data = dietData[prakritiType];

  return (
    <div className="diet-wrapper" style={{ background: data.bg }}>
      <div className="diet-card">
        <h1 className="diet-heading">{data.title}</h1>
        <p className="diet-subtext">
          Personalized Ayurvedic diet guidance based on your <b>Prakriti</b> type 🌿
        </p>

        <ul className="diet-list">
          {data.tips.map((tip, index) => (
            <li key={index} className="diet-item">
              <span>✨</span> {tip}
            </li>
          ))}
        </ul>

        <button
          className="diet-btn"
          onClick={() =>
            navigate("/dashboard/schedule", { state: { prakritiType } })
          }
        >
          View Daily Schedule →
        </button>
      </div>
    </div>
  );
};

export default DietChart;
