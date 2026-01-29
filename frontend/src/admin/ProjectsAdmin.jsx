import { useEffect, useState } from "react";
import API from "../services/api";
import "./admin.css";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProjects = () => {
    setLoading(true);
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (project) => {
    setSelectedId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
    });
    setImagePreview(`http://127.0.0.1:8000/${project.image}`);
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (image) data.append("image", image);

    try {
      if (selectedId) {
        await API.put(`/projects/${selectedId}`, data);
        setMessage("Project updated successfully!");
      } else {
        await API.post("/projects", data);
        setMessage("Project added successfully!");
      }

      resetForm();
      fetchProjects();
    } catch {
      setMessage("Operation failed. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setImage(null);
    setImagePreview(null);
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      setMessage("Project deleted successfully!");
      fetchProjects();
    } catch {
      setMessage("Failed to delete project.");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Manage Projects</h1>
          <p className="admin-subtitle">
            Add, edit, or remove projects from your portfolio
          </p>
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {message && (
        <div className={`alert ${message.includes("✅") || message.includes("successfully") ? "alert-success" : "alert-error"}`}>
          {message.includes("✅") ? "✓" : "✗"} {message.replace("✅", "").replace("❌", "")}
        </div>
      )}

      <div className="admin-form">
        <h3 className="form-title">
          {selectedId ? "✏️ Edit Project" : "➕ Add New Project"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Image</label>
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
              {selectedId ? "Update Project" : "Add Project"}
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
          <h3 className="table-title">Existing Projects ({filteredProjects.length})</h3>
          <div style={{ fontSize: "14px", color: "#64748b" }}>
            {loading ? "Loading..." : "All projects"}
          </div>
        </div>
        
        <div className="table-content">
          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏗️</div>
              <p>No projects found</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {search ? "Try a different search term" : "Add your first project above"}
              </p>
            </div>
          ) : (
            <div className="items-list" style={{ padding: "20px" }}>
              {filteredProjects.map((project) => (
                <div key={project._id} className="item-card">
                  <div className="item-header">
                    <div>
                      <h4 className="item-title">{project.name}</h4>
                      <p style={{ color: "#10b981", fontSize: "12px", marginTop: "4px" }}>
                        ID: {project._id}
                      </p>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleEdit(project)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(project._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  <p className="item-description">{project.description}</p>
                  {project.image && (
                    <img
                      src={`http://127.0.0.1:8000/${project.image}`}
                      alt={project.name}
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

export default ProjectsAdmin;