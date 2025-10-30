import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* 🌿 Hero Section */}
      <div className="home-hero">
        <h1 className="home-title">🌿 Prakriti Wellness App</h1>
        <p className="home-subtitle">
          Discover your <strong>Ayurvedic balance</strong> — personalize your diet, routine, and wellness journey
          through ancient wisdom and modern design 💫
        </p>

        <div className="home-buttons">
          <Link to="/dashboard" className="home-btn primary">
            🚀 Start Your Wellness Journey
          </Link>
        </div>
      </div>

      {/* 🌟 Features Section */}
      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🧘</span>
          <h3>Know Your Prakriti</h3>
          <p>Understand your unique Ayurvedic constitution — Vata, Pitta, or Kapha.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🥗</span>
          <h3>Personalized Diet</h3>
          <p>Get food and lifestyle suggestions tailored to your body type.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📅</span>
          <h3>Daily Routine</h3>
          <p>Plan your day with recommended Ayurvedic habits for better balance.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">📈</span>
          <h3>Track Progress</h3>
          <p>Record your improvements and manage follow-ups easily in one place.</p>
        </div>
      </div>

      {/* 🌈 About Section */}
      <div className="home-about">
        <h2>✨ Why Choose Prakriti Wellness?</h2>
        <p>
          We combine <strong>Ayurveda + Technology</strong> to help you live a more mindful and balanced life.
          Every recommendation you get is backed by traditional Ayurvedic wisdom — made simple and digital for modern lifestyles.
        </p>
      </div>

      {/* 🧭 Footer */}
      <footer className="home-footer">
        <p>
          Made with 💚 for holistic wellness | © {new Date().getFullYear()} Prakriti App
        </p>
      </footer>
    </div>
  );
};

export default Home;
