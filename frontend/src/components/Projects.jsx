import { useEffect, useState } from "react";
import API from "../services/api";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="projects-loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <section className="projects-container">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Discover our portfolio of successful real estate transformations
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏗️</div>
          <h3>No Projects Yet</h3>
          <p>Check back soon for our latest work</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image-container">
                <img
                  src={`http://127.0.0.1:8000/${project.image}`}
                  alt={project.name}
                  className="project-image"
                />
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>

                <button className="project-btn">
                  View Case Study <span>→</span>
                </button>
              </div>

              {hoveredProject === index && (
                <div className="project-hover-card">
                  <h4>Project Highlights</h4>
                  <ul>
                    <li>Market Analysis</li>
                    <li>Design Strategy</li>
                    <li>Sales Optimization</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
