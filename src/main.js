const tabla = document.getElementById("tabla-productos");
const formulario = document.getElementById("formularioProducto");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  const nuevoProducto = Object.fromEntries(datos.entries());

  await fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoProducto)
  });

  formulario.reset();
  bootstrap.Modal.getInstance(document.getElementById('productoModal')).hide();
  cargarProductos();
});

async function cargarProductos() {
  const res = await fetch('http://localhost:3000/productos');
  const productos = await res.json();

  tabla.innerHTML = productos.map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-warning btn-sm">Editar</button>
        <button class="btn btn-danger btn-sm">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

cargarProductos();
