import { useEffect, useState } from "react";
import API from "../services/api";
import "./admin.css";

const NewsletterAdmin = () => {
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmails = () => {
    setLoading(true);
    API.get("/subscribe")
      .then((res) => {
        setEmails(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Delete subscriber: ${email}?`)) return;
    try {
      await API.delete(`/subscribe/${id}`);
      fetchEmails();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Email", "Date Joined"].join(",") + "\n" +
      emails.map(e => `${e.email},${new Date(e.created_at).toLocaleDateString()}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEmails = emails.filter((e) =>
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Newsletter Subscribers</h1>
          <p className="admin-subtitle">
            Manage your email subscribers list
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by email..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleExport}>
            📥 Export CSV
          </button>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h3 className="table-title">
            Subscribers ({filteredEmails.length})
            <span style={{ fontSize: "14px", color: "#64748b", marginLeft: "12px" }}>
              Total: {emails.length}
            </span>
          </h3>
          <div style={{ fontSize: "14px", color: "#10b981" }}>
            📈 {(emails.length / 1000 * 100).toFixed(1)}% growth
          </div>
        </div>
        
        <div className="table-content">
          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Loading subscribers...</p>
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📧</div>
              <p>No subscribers found</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {search ? "Try a different search term" : "No one has subscribed yet"}
              </p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>Email Address</th>
                  <th>Date Subscribed</th>
                  <th>Status</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((sub, index) => (
                  <tr key={sub._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          background: "#d1fae5",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#10b981",
                          fontWeight: "bold"
                        }}>
                          {sub.email.charAt(0).toUpperCase()}
                        </div>
                        {sub.email}
                      </div>
                    </td>
                    <td>
                      {new Date(sub.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <span style={{
                        background: "#d1fae5",
                        color: "#065f46",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        Active
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            navigator.clipboard.writeText(sub.email);
                            alert("Email copied to clipboard!");
                          }}
                          title="Copy email"
                        >
                          📋
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(sub._id, sub.email)}
                          title="Delete subscriber"
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
        <h3 className="form-title">📊 Subscriber Analytics</h3>
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
              {emails.length}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Total Subscribers
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#3b82f6",
              marginBottom: "8px"
            }}>
              {emails.length > 0 ? "100%" : "0%"}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Active Rate
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#8b5cf6",
              marginBottom: "8px"
            }}>
              0
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              Unsubscribed
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#f59e0b",
              marginBottom: "8px"
            }}>
              {emails.length}
            </div>
            <div style={{ color: "#64748b", fontSize: "14px" }}>
              This Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdmin;