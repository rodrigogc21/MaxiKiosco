import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h1>Bienvenido a MaxiKiosco</h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0 2rem" }}>
        Una nueva revolucion en la compra de productos de kiosco. 
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          onClick={() => navigate("/")}
          style={buttonStyle}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => navigate("/registro")}
          style={buttonStyle}
        >
          Registrarse
        </button>
        <button
          onClick={() => navigate("/categorias")}
          style={buttonStyle}
        >
          Ver Categorías
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "white",
  transition: "background-color 0.3s",
};

export default Home;
