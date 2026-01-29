import { useEffect, useState } from "react";
import API from "../services/api";
import "./admin.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Dashboard</h1>
            <p className="admin-subtitle">Overview of your content</p>
          </div>
        </div>
        <div className="empty-state">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: "🏗️",
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      title: "Clients",
      value: stats.clients,
      icon: "👥",
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      title: "Contacts",
      value: stats.contacts,
      icon: "📞",
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      title: "Subscribers",
      value: stats.subscribers,
      icon: "📧",
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ];

  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            disabled
          />
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: card.bgColor,
                color: card.color,
              }}
            >
              {card.icon}
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="admin-form">
        <h3 className="form-title">📈 Quick Actions</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="btn btn-primary">
            + Add New Project
          </button>
          <button className="btn btn-secondary">
            📊 View Analytics
          </button>
          <button className="btn btn-secondary">
            📥 Export Data
          </button>
          <button className="btn btn-secondary">
            ⚙️ Settings
          </button>
        </div>
      </div>

      <div className="admin-form">
        <h3 className="form-title">📋 Recent Activity</h3>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No recent activity to display</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Add some content to see activity here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;