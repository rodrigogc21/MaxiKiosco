import React from "react";
import { useNavigate } from "react-router-dom";

const categorias = [
  {
    id: 1,
    nombre: "Lácteos",
    descripcion: "Leche, quesos, yogures frescos y cremosos.",
    imagen:
      "https://media.istockphoto.com/id/544807136/es/foto/varios-productos-l%C3%A1cteos-frescos.jpg?s=1024x1024&w=is&k=20&c=iYZ2Xr0Zwjwk0DGfvxH-U3eLi3fDcru4E9y2gVrjwSQ=",
  },
  {
    id: 2,
    nombre: "Dulces",
    descripcion: "Dulces tradicionales y golosinas para todos.",
    imagen:
      "https://media.istockphoto.com/id/1490797933/es/foto/sabrosos-caramelos-de-gelatina-de-colores-como-fondo-vista-superior.jpg?s=1024x1024&w=is&k=20&c=zGFgZESco2RrfzvGczOL-UQ6RkkJS5AiBOUGsl-Cmns=",
  },
  {
    id: 3,
    nombre: "Snacks",
    descripcion: "Papas, chocolates, galletitas y más.",
    imagen:
      "https://media.istockphoto.com/id/1473199888/es/foto/bocadillos-salados-mezcla-de-fiesta-un-surtido-de-aperitivos-crujientes-en-lo-alto.jpg?s=1024x1024&w=is&k=20&c=17XAvYaX4MSbPy-ojrBY9Gbe6S7Hz7nR2GabmMQLyUA=",
  },
  {
    id: 4,
    nombre: "Bebidas",
    descripcion: "Refrescos, jugos y aguas para todos los gustos.",
    imagen:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
  },
];

const Categorias = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/productos/${id}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Categorías del MaxiKiosco
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {categorias.map(({ id, nombre, descripcion, imagen }) => (
          <div
            key={id}
            style={{
              width: "250px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onClick={() => handleClick(id)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={imagen}
              alt={nombre}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
              loading="lazy"
            />
            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{nombre}</h3>
              <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>
                {descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
