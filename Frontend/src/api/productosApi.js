const BASE_URL = "http://localhost:3000/productos";

export async function obtenerProductos() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

// Si necesitas categorías en otro endpoint:
export async function obtenerCategorias() {
  const res = await fetch("http://localhost:3000/categorias");
  if (!res.ok) throw new Error("Error al cargar categorías");
  return res.json();
}