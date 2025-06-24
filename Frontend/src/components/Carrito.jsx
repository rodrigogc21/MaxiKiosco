import React from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../context/carritoContext";
const token = localStorage.getItem('token');

await axios.post('/ventas/procesar-carrito', {
  id_formaPago: ''
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCarrito();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <FaShoppingCart color="#007bff" size={24} />
        Carrito
      </h3>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {carrito.map((item) => (
              <li
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "0.25rem",
                }}
              >
                <div style={{ flex: 2 }}>
                  {item.nombre} x {item.cantidad}
                </div>

                <div style={{ flex: 2, textAlign: "right" }}>
                  ${item.precio * item.cantidad}
                </div>

                <div
                  style={{
                    flex: 2,
                    display: "flex",
                    gap: "0.25rem",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => disminuirCantidad(item._id)}
                    style={{
                      padding: "2px 6px",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #007bff",
                      backgroundColor: "white",
                      color: "#007bff",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => aumentarCantidad(item._id)}
                    style={{
                      padding: "2px 6px",
                      cursor: "pointer",
                      borderRadius: "3px",
                      border: "1px solid #007bff",
                      backgroundColor: "white",
                      color: "#007bff",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarDelCarrito(item._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      border: "none",
                      color: "white",
                      borderRadius: "3px",
                      cursor: "pointer",
                      padding: "0 6px",
                    }}
                    title="Eliminar producto"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginTop: "1rem",
              textAlign: "right",
            }}
          >
            Total: ${total}
          </p>

          <button
            onClick={vaciarCarrito}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#6c757d",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
