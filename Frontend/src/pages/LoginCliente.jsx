import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCliente = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (email.trim() === "") {
    setError("Por favor ingrese su correo.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError("Por favor ingrese un correo válido.");
    return;
  }

  if (password.trim() === "") {
    setError("Por favor ingrese su contraseña.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_usuario: email, contraseña: password })
    });


    const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    console.log("Usuario ha ingresado correctamente")
    navigate("/home");
  } else {
    setError(data.error || "Error al iniciar sesión");
  }

  } catch (error) {
    console.error(error);
    setError("Error al conectar con el servidor");
  }
};

  return (
    <form
      onSubmit={handleLogin}
      style={{
        padding: "2rem",
        maxWidth: "320px",
        margin: "4rem auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "1rem",
          boxSizing: "border-box",
        }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "1rem",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <p style={{ color: "#dc3545", marginTop: "1rem", fontWeight: "600" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem",
          width: "100%",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Ingresar
      </button>
    </form>
  );
};

export default LoginCliente;
