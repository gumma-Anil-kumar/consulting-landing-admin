import { useEffect, useState } from "react";
import API from "../services/api";
import "./admin.css";

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContacts = () => {
    setLoading(true);
    API.get("/contact")
      .then((res) => setContacts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete contact: ${name}?`)) return;
    try {
      await API.delete(`/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Contact Submissions</h1>
          <p className="admin-subtitle">
            View and manage contact form submissions
          </p>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or mobile..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h3 className="table-title">
            Contacts ({filteredContacts.length})
            <span style={{ fontSize: "14px", color: "#64748b", marginLeft: "12px" }}>
              Total: {contacts.length}
            </span>
          </h3>
          <button 
            className="btn btn-secondary"
            onClick={fetchContacts}
            disabled={loading}
          >
            {loading ? "🔄 Loading..." : "🔄 Refresh"}
          </button>
        </div>
        
        <div className="table-content">
          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Loading contacts...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📞</div>
              <p>No contacts found</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {search ? "Try a different search term" : "No contact submissions yet"}
              </p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          background: "#dbeafe",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#3b82f6",
                          fontWeight: "bold",
                          fontSize: "14px"
                        }}>
                          {contact.full_name.charAt(0).toUpperCase()}
                        </div>
                        {contact.full_name}
                      </div>
                    </td>
                    <td>
                      <a href={`mailto:${contact.email}`} style={{ color: "#3b82f6", textDecoration: "none" }}>
                        {contact.email}
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${contact.mobile}`} style={{ color: "#475569", textDecoration: "none" }}>
                        {contact.mobile}
                      </a>
                    </td>
                    <td>{contact.city}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(contact, null, 2));
                            alert("Contact details copied to clipboard!");
                          }}
                          title="Copy details"
                        >
                          📋
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(contact._id, contact.full_name)}
                          title="Delete contact"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="admin-form" style={{ marginTop: "30px" }}>
        <h3 className="form-title">📊 Contact Analytics</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#10b981",
              marginBottom: "8px"
            }}>
              {contacts.length}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Total Contacts
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#8b5cf6",
              marginBottom: "8px"
            }}>
              {contacts.filter(c => c.city).length}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              With City Info
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#f59e0b",
              marginBottom: "8px"
            }}>
              {new Set(contacts.map(c => c.city)).size}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Unique Cities
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "8px"
            }}>
              {contacts.filter(c => c.created_at && new Date(c.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Last 30 Days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsAdmin;