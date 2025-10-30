import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/DailySchedule.css";

const scheduleData = {
  vata: {
    title: "🌬️ Vata – The Air Element",
    color: "linear-gradient(135deg, #fff6d1, #ffeab6, #ffdf9e)",
    morning: "Wake early 🌅, drink warm water, gentle yoga or meditation.",
    afternoon: "Eat warm, nourishing meals 🍲. Avoid skipping lunch.",
    evening: "Relaxing walk 🚶‍♀️, warm tea 🍵, and early bedtime 💤.",
  },
  pitta: {
    title: "🔥 Pitta – The Fire Element",
    color: "linear-gradient(135deg, #c6f9ff, #b3f0ff, #e0ffff)",
    morning: "Cool shower 🚿, calm breathing, and fresh fruits for breakfast 🍎.",
    afternoon: "Eat cooling foods like rice and cucumber 🥗. Avoid spicy dishes.",
    evening: "Unwind with light reading 📖 or soothing music 🎵.",
  },
  kapha: {
    title: "🌿 Kapha – The Earth Element",
    color: "linear-gradient(135deg, #eaffd5, #c8facc, #b6f5b0)",
    morning: "Wake before sunrise 🌞, brisk walk 🏃‍♂️, dry massage for energy.",
    afternoon: "Light meals 🥣, stay active after eating.",
    evening: "Avoid heavy dinners 🍛. Try deep breathing before bed 🧘‍♂️.",
  },
};

const DailySchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prakritiType = location.state?.prakritiType?.toLowerCase() || "vata";
  const schedule = scheduleData[prakritiType];

  return (
    <div className="schedule-wrapper" style={{ background: schedule.color }}>
      <div className="schedule-card">
        <h1 className="schedule-heading">{schedule.title}</h1>
        <p className="schedule-subtext">
          Your Ayurvedic-inspired daily routine for <b>balance & wellbeing</b> 🌞
        </p>

        <div className="schedule-grid">
          <div className="schedule-section morning">
            <h3>🌅 Morning</h3>
            <p>{schedule.morning}</p>
          </div>

          <div className="schedule-section afternoon">
            <h3>🌞 Afternoon</h3>
            <p>{schedule.afternoon}</p>
          </div>

          <div className="schedule-section evening">
            <h3>🌙 Evening</h3>
            <p>{schedule.evening}</p>
          </div>
        </div>

        <button
          className="schedule-btn"
          onClick={() => navigate("/dashboard/followups")}
        >
          View Follow-ups →
        </button>
      </div>
    </div>
  );
};

export default DailySchedule;
