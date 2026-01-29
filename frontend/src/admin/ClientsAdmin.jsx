import { useEffect, useState } from "react";
import API from "../services/api";
import "./admin.css";

const ClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchClients = () => {
    setLoading(true);
    API.get("/clients")
      .then((res) => setClients(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (client) => {
    setSelectedId(client._id);
    setFormData({
      name: client.name,
      designation: client.designation,
      description: client.description,
    });
    setImagePreview(`http://127.0.0.1:8000/${client.image}`);
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("designation", formData.designation);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    try {
      if (selectedId) {
        await API.put(`/clients/${selectedId}`, data);
        setMessage("Client updated successfully!");
        setMessageType("success");
      } else {
        await API.post("/clients", data);
        setMessage("Client added successfully!");
        setMessageType("success");
      }

      resetForm();
      fetchClients();
    } catch {
      setMessage("Operation failed. Please try again.");
      setMessageType("error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", designation: "", description: "" });
    setImage(null);
    setImagePreview(null);
    setSelectedId(null);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete client: ${name}?`)) return;
    try {
      await API.delete(`/clients/${id}`);
      setMessage("Client deleted successfully!");
      setMessageType("success");
      fetchClients();
    } catch {
      setMessage("Failed to delete client.");
      setMessageType("error");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manage Clients</h1>
          <p className="admin-subtitle">
            Add, edit, or remove client testimonials
          </p>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search client by name..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {message && (
        <div className={`alert ${messageType === "success" ? "alert-success" : "alert-error"}`}>
          {message}
        </div>
      )}

      <div className="admin-form">
        <h3 className="form-title">
          {selectedId ? "✏️ Edit Client" : "👥 Add New Client"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter client name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter client designation"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description/Testimonial</label>
            <textarea
              className="form-textarea"
              placeholder="Enter client description or testimonial"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Client Image</label>
            <div className="file-upload">
              <input
                type="file"
                className="file-input"
                onChange={handleImageChange}
                accept="image/*"
              />
              <div className="file-label">
                <strong>Click to upload</strong> or drag and drop
                <br />
                <span style={{ fontSize: "12px" }}>PNG, JPG, GIF up to 5MB</span>
              </div>
              {imagePreview && (
                <div className="file-name">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button type="submit" className="btn btn-primary">
              {selectedId ? "Update Client" : "Add Client"}
            </button>
            {selectedId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h3 className="table-title">Existing Clients ({filteredClients.length})</h3>
          <div style={{ fontSize: "14px", color: "#64748b" }}>
            {loading ? "Loading..." : "All clients"}
          </div>
        </div>
        
        <div className="table-content">
          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Loading clients...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>No clients found</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {search ? "Try a different search term" : "Add your first client above"}
              </p>
            </div>
          ) : (
            <div className="items-list" style={{ padding: "20px" }}>
              {filteredClients.map((client) => (
                <div key={client._id} className="item-card">
                  <div className="item-header">
                    <div>
                      <h4 className="item-title">{client.name}</h4>
                      <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
                        {client.designation}
                      </p>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(client)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(client._id, client.name)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <p className="item-description">{client.description}</p>
                  {client.image && (
                    <img
                      src={`http://127.0.0.1:8000/${client.image}`}
                      alt={client.name}
                      className="item-image"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsAdmin;