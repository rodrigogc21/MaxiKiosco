import React from "react";
import { useParams } from "react-router-dom";
import { obtenerProductos, obtenerCategorias } from "../api/productosApi.js";
import { useCarrito } from "../context/carritoContext";
import Carrito from "../components/Carrito";


const ProductosPorCategoria = () => {
  const { id } = useParams();
  const categoriaId = Number(id);
  const { agregarAlCarrito } = useCarrito();

  const [productos, setProductos] = React.useState([]);
  const [categoria, setCategoria] = React.useState(null);

  React.useEffect(() => {
    const cargarDatos = async () => {
      const allProductos = await obtenerProductos();
      console.log("📦 Productos recibidos:", allProductos);

      const allCategorias = await obtenerCategorias();
      console.log("📂 Categorías recibidas:", allCategorias);

      setProductos(allProductos.filter((p) => p.categoriaId === categoriaId));
      setCategoria(allCategorias.find((c) => c.id === categoriaId));
    };
    cargarDatos();
  }, [categoriaId]);

  if (!categoria) return <p>Cargando categoría...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Productos de {categoria.nombre}</h2>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 3, display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {productos.map(({ _id, nombre, precio, imagen }) => (
            <div
              key={_id}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={imagen}
                alt={nombre}
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <h3>{nombre}</h3>
              <p>${precio}</p>
              <button
                onClick={() => agregarAlCarrito({ _id, nombre, precio, imagen })}
                style={{
                  padding: "0.5rem 1rem",
                  marginTop: "0.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>

        <Carrito />
      </div>
    </div>
  );
};

export default ProductosPorCategoria;
