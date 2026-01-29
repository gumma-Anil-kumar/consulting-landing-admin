import { useState } from "react";
import API from "../services/api";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/contact", formData);
      setMessage("Submitted successfully ✅");
      setFormData({ full_name: "", email: "", mobile: "", city: "" });
    } catch {
      setMessage("Submission failed ❌");
    }
  };

  return (
    <section className="contact">
      <h2>Get a Free Consultation</h2>

      <form onSubmit={handleSubmit}>
        <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default ContactForm;
