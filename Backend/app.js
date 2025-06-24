const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Rutas públicas
const verProductosRoutes = require('./routes/public/verProductosRoutes');
const authRoutes = require('./routes/public/authRoutes');

app.use('/api', verProductosRoutes);
app.use('/api/auth', authRoutes);

// Rutas privadas
app.use('/api/modificar-productos', require('./routes/private/crudProductosRoutes'));
app.use('/api/usuarios', require('./routes/private/usuariosRoutes'));
app.use('/api/proveedores', require('./routes/private/proveedoresRoutes'));
app.use('/api/categorias', require('./routes/private/categoriasRoutes'));
app.use('/api/ventas', require('./routes/private/ventasRoutes'));
app.use('/api/ordenes-compra', require('./routes/private/ordenCompraRoutes'));

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
