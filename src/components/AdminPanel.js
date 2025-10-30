import React, { useState, useEffect } from "react";
import "../styles/AdminPanel.css"; 

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    const userKeys = allKeys.filter((key) => key.startsWith("profile_"));
    const userList = userKeys.map((key) => key.replace("profile_", ""));
    setUsers(userList);
  }, []);

  const handleSelectUser = (userName) => {
    setSelectedUser(userName);
    const profileData = JSON.parse(localStorage.getItem(`profile_${userName}`));
    const followUpData =
      JSON.parse(localStorage.getItem(`followUps_${userName}`)) || [];
    setProfile(profileData);
    setFollowUps(followUpData);
  };

  const handleDeleteUser = (userName) => {
    if (window.confirm(`Delete all data for "${userName}"?`)) {
      localStorage.removeItem(`profile_${userName}`);
      localStorage.removeItem(`followUps_${userName}`);
      const updatedUsers = users.filter((u) => u !== userName);
      setUsers(updatedUsers);

      if (selectedUser === userName) {
        setSelectedUser(null);
        setProfile(null);
        setFollowUps([]);
      }
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-card">
        <h2 className="admin-title">🧑‍💼 Admin Panel</h2>
        <p className="admin-subtitle">Manage users and follow-up records.</p>

        {users.length === 0 ? (
          <p className="admin-empty">No user profiles found.</p>
        ) : (
          <div className="admin-layout">
            {/* Sidebar: User List */}
            <div className="admin-sidebar">
              <h3>👥 Users</h3>
              {users.map((user) => (
                <div key={user} className="admin-user-item">
                  <button
                    onClick={() => handleSelectUser(user)}
                    className={`admin-user-btn ${
                      selectedUser === user ? "active" : ""
                    }`}
                  >
                    {user}
                  </button>
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDeleteUser(user)}
                    title="Delete user data"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div className="admin-details">
              {selectedUser ? (
                <>
                  <h3>📋 Profile Details</h3>
                  {profile ? (
                    <pre className="admin-box">
                      {JSON.stringify(profile, null, 2)}
                    </pre>
                  ) : (
                    <p>No profile data for this user.</p>
                  )}

                  <h3>📅 Follow-Ups</h3>
                  {followUps.length > 0 ? (
                    <div className="admin-followups-list">
                      {followUps.map((f) => (
                        <div
                          key={f.id}
                          className={`admin-follow-card ${
                            f.completed ? "completed" : ""
                          }`}
                        >
                          <p>{f.message}</p>
                          <small>
                            {new Date(f.date).toLocaleDateString()} —{" "}
                            {f.completed ? "✅ Completed" : "Pending"}
                          </small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No follow-ups for this user.</p>
                  )}
                </>
              ) : (
                <p className="admin-empty">Select a user to view details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
