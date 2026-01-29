import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";
import ProjectsAdmin from "./ProjectsAdmin";
import ClientsAdmin from "./ClientsAdmin";
import ContactsAdmin from "./ContactsAdmin";
import NewsletterAdmin from "./NewsletterAdmin";
import "./admin.css";

const AdminLayout = () => {
  // Check authentication
  const isAuthenticated = localStorage.getItem("admin_token") || true; // Add your auth logic

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsAdmin />} />
          <Route path="/clients" element={<ClientsAdmin />} />
          <Route path="/contacts" element={<ContactsAdmin />} />
          <Route path="/newsletter" element={<NewsletterAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;