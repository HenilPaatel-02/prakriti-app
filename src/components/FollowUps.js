import React, { useState, useEffect } from "react";
import "../styles/FollowUps.css";

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([]);
  const [user, setUser] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const activeUser = localStorage.getItem("activeUser");
    setUser(activeUser);

    if (activeUser) {
      const saved = JSON.parse(localStorage.getItem(`followUps_${activeUser}`)) || [];
      const sorted = saved.sort((a, b) => new Date(a.date) - new Date(b.date));
      setFollowUps(sorted);
    }
  }, []);

  const addFollowUp = () => {
    if (!user) return alert("Please save your profile first.");
    if (!note || !date) return alert("Please enter both a note and date.");

    const newFollowUp = {
      id: Date.now(),
      message: note,
      date,
      completed: false,
    };

    const updated = [...followUps, newFollowUp].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setFollowUps(updated);
    localStorage.setItem(`followUps_${user}`, JSON.stringify(updated));

    setNote("");
    setDate("");
  };

  const toggleComplete = (id) => {
    const updated = followUps.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setFollowUps(updated);
    localStorage.setItem(`followUps_${user}`, JSON.stringify(updated));
  };

  const deleteFollowUp = (id) => {
    const updated = followUps.filter((item) => item.id !== id);
    setFollowUps(updated);
    localStorage.setItem(`followUps_${user}`, JSON.stringify(updated));
  };

  const getDaysLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : diff === 0 ? "Due today!" : "Past due ⏳";
  };

  const filteredFollowUps =
    filter === "all"
      ? followUps
      : filter === "completed"
      ? followUps.filter((f) => f.completed)
      : followUps.filter((f) => !f.completed);

  const progress =
    followUps.length > 0
      ? Math.round((followUps.filter((f) => f.completed).length / followUps.length) * 100)
      : 0;

  const quotes = [
    "Small steps every day lead to big results 🌱",
    "Healing takes consistency, not perfection 🌸",
    "Stay grounded and trust your wellness journey 🌿",
    "Discipline is self-love in motion 🌞",
  ];

  return (
    <div className="followups-wrapper">
      <div className="followups-card">
        <h2 className="followups-title">📅 Follow-Up Tracker</h2>

        {user ? (
          <>
            <p className="followups-subtitle">
              Welcome back, <b>{user}</b> 🌿 Keep nurturing your Ayurvedic balance!
            </p>

            {/* 🌼 Progress Bar */}
            {followUps.length > 0 && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <p className="progress-text">
              {progress}% of your tasks completed
            </p>

            {/* ✍️ Input Form */}
            <div className="followups-form">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter follow-up note..."
                className="followups-input"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="followups-date"
              />
              <button onClick={addFollowUp} className="followups-add">
                ➕ Add
              </button>
            </div>

            {/* 🔍 Filters */}
            <div className="followups-filters">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={filter === "pending" ? "active" : ""}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "active" : ""}
              >
                Completed
              </button>
            </div>

            {/* 📋 Follow-Up List */}
            <div className="followups-list">
              {filteredFollowUps.length === 0 ? (
                <p className="followups-empty">
                  No reminders found for this filter ✨
                </p>
              ) : (
                filteredFollowUps.map((item) => (
                  <div
                    key={item.id}
                    className={`followups-item ${item.completed ? "done" : ""}`}
                  >
                    <div className="followups-text">
                      <p>{item.message}</p>
                      <small>
                        Next Reminder: {new Date(item.date).toLocaleDateString()} (
                        {getDaysLeft(item.date)})
                      </small>
                    </div>
                    <div className="followups-actions">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`followups-done-btn ${
                          item.completed ? "completed" : ""
                        }`}
                      >
                        {item.completed ? "✅ Done" : "Mark Done"}
                      </button>
                      <button
                        onClick={() => deleteFollowUp(item.id)}
                        className="followups-delete"
                        title="Delete reminder"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 🌸 Motivation */}
            <p className="followups-quote">
              {quotes[Math.floor(Math.random() * quotes.length)]}
            </p>
          </>
        ) : (
          <p className="followups-empty">
            Please save your profile in <b>User Profile</b> before using Follow-Ups.
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowUps;
