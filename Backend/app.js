const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// Rutas públicas
const verProductosRoutes = require('./routes/public/verProductosRoutes');
const authRoutes = require('./routes/public/authRoutes');
const verCategoriasRoutes = require('./routes/public/verCategoriasRoutes')

app.use('/api/productos', verProductosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categorias', verCategoriasRoutes);


// Rutas privadas
 
app.use('/api/modificar-producto', require('./routes/private/crudProductosRoutes'));
app.use('/api/usuarios', require('./routes/private/usuariosRoutes'));
app.use('/api/proveedores', require('./routes/private/proveedoresRoutes'));
app.use('/api/modificar-categorias', require('./routes/private/categoriasRoutes'));
app.use('/api/ventas', require('./routes/private/ventasRoutes'));
app.use('/api/ordenes-compra', require('./routes/private/ordenCompraRoutes'));
app.use('/api/carrito', require('./routes/private/carritoRoutes'))

app.get('/',(req, res) => {
  res.send('Backend funcionando correctamente')
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
