// Update Home.jsx - Add ID to Newsletter section
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        {/* ... your hero content ... */}
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section-padding">
        <Projects />
      </section>

      {/* Clients Section */}
      <section id="clients" className="clients-section section-padding">
        <div className="section-header">
          <h2 className="section-title">Trusted By Industry Leaders</h2>
          <p className="section-subtitle">
            Join 500+ successful businesses that transformed with our expertise
          </p>
        </div>
        <Clients />
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="section-title">Ready to Transform Your Vision?</h2>
            <p className="section-subtitle">
              Schedule a free 30-minute consultation with our experts
            </p>
            {/* ... contact details ... */}
          </div>
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Newsletter Section - ADD ID HERE */}
      <section id="subscribe" className="newsletter-section section-padding">
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;