import { NavLink } from "react-router-dom";
import "./admin.css";

const AdminSidebar = () => {
  const navItems = [
    { path: "", icon: "📊", label: "Dashboard" },
    { path: "projects", icon: "🏗️", label: "Projects" },
    { path: "clients", icon: "👥", label: "Clients" },
    { path: "contacts", icon: "📞", label: "Contacts" },
    { path: "newsletter", icon: "📧", label: "Newsletter" },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>
          <span style={{ color: "#10b981" }}>Admin</span> Panel
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "4px" }}>
          v1.0 • Content Management
        </p>
      </div>

      <div className="admin-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === ""}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "auto",
        }}
      >
        <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "8px" }}>
          Logged in as: <strong style={{ color: "white" }}>Admin</strong>
        </div>

        <button
          className="btn btn-secondary"
          style={{ width: "100%", fontSize: "12px", padding: "8px" }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
