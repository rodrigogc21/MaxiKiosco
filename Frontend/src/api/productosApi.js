const BASE_URL = "http://localhost:3307/api";

export async function obtenerProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function obtenerCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`);
  if (!res.ok) throw new Error("Error al cargar categorías");
  return res.json();
}
