import { useEffect, useState } from "react";
import API from "../services/api";
import "./Clients.css";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get("/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="clients">
      <h2>Happy Clients</h2>

      {clients.length === 0 && <p>No clients found</p>}

      <div className="client-grid">
        {clients.map((client, index) => (
          <div className="client-card" key={index}>
            <img
              src={`http://127.0.0.1:8000/${client.image}`}
              alt={client.name}
            />
            <h4>{client.name}</h4>
            <span>{client.designation}</span>
            <p>{client.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
