import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";
import ProjectsAdmin from "./ProjectsAdmin";
import ClientsAdmin from "./ClientsAdmin";
import ContactsAdmin from "./ContactsAdmin";
import NewsletterAdmin from "./NewsletterAdmin";
import "./admin.css";

const AdminLayout = () => {
  // TEMP auth (ok for assignment)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <Routes>
          {/* /admin */}
          <Route index element={<Dashboard />} />

          {/* /admin/projects */}
          <Route path="projects" element={<ProjectsAdmin />} />

          {/* /admin/clients */}
          <Route path="clients" element={<ClientsAdmin />} />

          {/* /admin/contacts */}
          <Route path="contacts" element={<ContactsAdmin />} />

          {/* /admin/newsletter */}
          <Route path="newsletter" element={<NewsletterAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
