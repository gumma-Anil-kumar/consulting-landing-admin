// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll
      const sections = ["home", "projects", "clients", "contact", "subscribe"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Define navigation items with display labels
  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "clients", label: "Clients" },
    { id: "contact", label: "Contact" },
    { id: "subscribe", label: "Subscribe" }
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection("home")}>
          <span className="logo-text">ConsultPro</span>
          <span className="logo-dot">.</span>
        </div>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
              <span className="link-underline"></span>
            </button>
          ))}
        </div>

        <button 
          className="nav-cta"
          onClick={() => scrollToSection("contact")}
        >
          Get Consultation
        </button>
      </div>
    </nav>
  );
};

export default Navbar;