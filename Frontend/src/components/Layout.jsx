import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaHome, FaSignInAlt, FaUserPlus, FaThList } from "react-icons/fa";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <header
        style={{
          backgroundColor: "#ff2727",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="https://scontent.ftuc1-1.fna.fbcdn.net/v/t39.30808-6/301021047_493230899479883_2558814586494829949_n.png?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=e5knsrGguqIQ7kNvwHDxWJi&_nc_oc=Adnoh2tKZEvm9dCvJ-Z8tB1FRuwkHiChHPYbgHK0npCgYA5piXvFOiacE5-3-z7TYMo&_nc_zt=23&_nc_ht=scontent.ftuc1-1.fna&_nc_gid=8vHPImGmeH1M5F6JPOLBkQ&oh=00_AfMs7CrMoxZ9iGT86WPWXYnxiPir48hC67IEHSgvTmJN3g&oe=685E6D2E"
            alt="MaxiKiosco Logo"
            style={{ height: 80, cursor: "pointer", marginRight: "1rem" }}
            onClick={() => navigate("/")}
          />
          <div
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              cursor: "default",
              userSelect: "none",
              color: "#fff",
            }}
          >
            MaxiKiosco
          </div>

          <a
            href="https://facebook.com/tu-pagina"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "1.4rem" }}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com/tu-pagina"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "1.4rem" }}
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/tu-numero"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", fontSize: "1.4rem" }}
          >
            <FaWhatsapp />
          </a>
        </div>

        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => navigate("/home")}
            style={buttonStyle}
            title="Inicio"
          >
            <FaHome style={{ marginRight: 5 }} />
            Inicio
          </button>
          <button
            onClick={() => navigate("/categorias")}
            style={buttonStyle}
            title="Categorías"
          >
            <FaThList style={{ marginRight: 5 }} />
            Categorías
          </button>
          <button
            onClick={() => navigate("/")}
            style={buttonStyle}
            title="Login"
          >
            <FaSignInAlt style={{ marginRight: 5 }} />
            Login
          </button>
          <button
            onClick={() => navigate("/registro")}
            style={buttonStyle}
            title="Registrarse"
          >
            <FaUserPlus style={{ marginRight: 5 }} />
            Registrarse
          </button>
        </nav>
      </header>

      <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f4f6f8" }}>
        {children}
      </main>

      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        © 2025 MaxiKiosco - Todos los derechos reservados
      </footer>
    </div>
  );
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#ffffff",
  color: "black",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.3s ease",
  userSelect: "none",
};

export default Layout;
