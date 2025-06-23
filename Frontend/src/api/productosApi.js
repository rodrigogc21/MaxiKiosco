const BASE_URL = "http://localhost/MaxiKiosco/api";

export async function obtenerProductos() {
  const res = await fetch(`${BASE_URL}/productos.php`);
  if (!res.ok) throw new Error("Error al cargar productos");
  const data = await res.json();
  console.log("📦 Productos cargados:", data); // 👈 Para debugging
  return data;
}

export async function obtenerCategorias() {
  const res = await fetch(`${BASE_URL}/categorias.php`);
  if (!res.ok) throw new Error("Error al cargar categorías");
  const data = await res.json();
  console.log("📂 Categorías cargadas:", data); // 👈 Para debugging
  return data;
}