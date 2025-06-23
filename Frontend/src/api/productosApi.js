const categoriasFake = [
  { id: 1, nombre: "Lácteos" },
  { id: 2, nombre: "Dulces" },
  { id: 3, nombre: "Snacks" },
  { id: 4, nombre: "Bebidas" },
];

const productosFake = [
  { _id: 1, nombre: "Leche", precio: 300, categoriaId: 1, imagen: "/imagenes/leche.jpg" },
  { _id: 2, nombre: "Queso", precio: 500, categoriaId: 1, imagen: "/imagenes/queso.jpg" },
  { _id: 3, nombre: "Chocolate", precio: 250, categoriaId: 2, imagen: "/imagenes/chocolate.jpg" },
  { _id: 4, nombre: "Caramelos", precio: 150, categoriaId: 2, imagen: "/imagenes/caramelos.jpg" },
  { _id: 5, nombre: "Papas fritas", precio: 200, categoriaId: 3, imagen: "/imagenes/papas.jpg" },
  { _id: 6, nombre: "Maní", precio: 180, categoriaId: 3, imagen: "/imagenes/mani.jpg" },
  { _id: 7, nombre: "Coca-Cola", precio: 500, categoriaId: 4, imagen: "/imagenes/coca.jpg" },
  { _id: 8, nombre: "Pepsi", precio: 450, categoriaId: 4, imagen: "/imagenes/pepsi.jpg" },
];

export const obtenerCategorias = async () => categoriasFake;

export const obtenerProductos = async () => productosFake;
