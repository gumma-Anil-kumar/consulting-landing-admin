import { useState } from "react";
import API from "../services/api";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/subscribe", { email });
      setMessage("Subscribed successfully ✅");
      setEmail("");
    } catch {
      setMessage("Subscription failed ❌");
    }
  };

  return (
    <section className="newsletter">
      <h2>Subscribe to our Newsletter</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

export default Newsletter;
