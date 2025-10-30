import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import PrakritiQuiz from "../components/PrakritiQuiz";
import DietChart from "../components/DietChart";
import DailySchedule from "../components/DailySchedule";
import FollowUps from "../components/FollowUps";
import AdminPanel from "../components/AdminPanel";
import "../styles/Dashboard.css";

const Dashboard = () => (
  <div className="dashboard-container">
    <h1 className="dashboard-title">🌼 Wellness Dashboard</h1>
    <p className="dashboard-subtitle">
      Explore your Ayurvedic lifestyle journey — personalize, track, and grow 🌿
    </p>

    <nav className="dashboard-nav">
      <Link to="profile" className="nav-btn">
        👤 User Profile
      </Link>
      <Link to="quiz" className="nav-btn">
        🧘 Prakriti Quiz
      </Link>
      <Link to="diet" className="nav-btn">
        🍎 Diet Chart
      </Link>
      <Link to="schedule" className="nav-btn">
        ⏰ Daily Schedule
      </Link>
      <Link to="followups" className="nav-btn">
        📅 Follow Ups
      </Link>
      <Link to="admin" className="nav-btn">
        🛠️ Admin Panel
      </Link>
    </nav>

    <div className="dashboard-content">
      <Routes>
        <Route path="profile" element={<UserProfile />} />
        <Route path="quiz" element={<PrakritiQuiz />} />
        <Route path="diet" element={<DietChart />} />
        <Route path="schedule" element={<DailySchedule />} />
        <Route path="followups" element={<FollowUps />} />
        <Route path="admin" element={<AdminPanel />} />
      </Routes>
    </div>
  </div>
);

export default Dashboard;
