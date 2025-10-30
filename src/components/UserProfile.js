import React, { useState } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    health: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("⚠️ Please enter your name before saving.");
      return;
    }

    // ✅ Save profile
    localStorage.setItem("activeUser", form.name);
    localStorage.setItem(`profile_${form.name}`, JSON.stringify(form));

    // ✅ Add or update in users list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingIndex = users.findIndex((u) => u.name === form.name);
    if (existingIndex !== -1) {
      users[existingIndex] = { ...users[existingIndex], ...form };
    } else {
      users.push({ id: Date.now(), ...form, prakriti: "Not set yet" });
    }
    localStorage.setItem("users", JSON.stringify(users));

    alert(`✅ Profile for "${form.name}" saved successfully!`);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 User Profile</h2>
      <p className="profile-subtitle">
        Fill in your basic health and lifestyle details.
      </p>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="profile-input"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={form.age}
          onChange={handleChange}
          className="profile-input"
          required
        />
        <textarea
          name="health"
          placeholder="Health info (e.g., allergies, diet, habits)"
          value={form.health}
          onChange={handleChange}
          className="profile-textarea"
        />

        <button type="submit" className="profile-button">
          💾 Save Profile
        </button>
      </form>

      <div className="profile-preview-box">
        <h3 className="profile-preview-title">📋 Live Preview</h3>
        <pre className="profile-preview">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default UserProfile;
