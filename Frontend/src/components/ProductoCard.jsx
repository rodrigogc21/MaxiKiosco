import React from "react";
import { toast } from "react-toastify";

const ProductoCard = ({ producto, agregarAlCarrito }) => {
  const handleAgregar = () => {
    agregarAlCarrito(producto);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  return (
    <div style={styles.card}>
      <img src={producto.imagen} alt={producto.nombre} style={styles.imagen} />
      <h3>{producto.nombre}</h3>
      <p style={styles.precio}>Precio: ${producto.precio}</p>
      <button onClick={handleAgregar} style={styles.boton}>
        Agregar al carrito
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
    width: "250px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
  },
  imagen: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "0.5rem",
  },
  precio: {
    fontWeight: "bold",
    color: "#333",
  },
  boton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};

export default ProductoCard;
