const express = Require('express');
const cors = Require('cors')
Require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas públicas
app.use('/api/productos', Require('./routes/public/verProductosRoutes'))
app.use('/api/auth', Require('./routes/public/authRoutes'))

//Rutas privadas
app.use('/api/modificar-productos', Require('./routes/private/crudProductosRoutes'))
app.use('/api/usuarios', Require('./routes/private/usuariosRoutes'))
app.use('/api/proveedores', Require('./routes/private/proveedoresRoutes'))
app.use('/api/categorias', Require('./routes/private/categoriasRoutes'))
app.use('/api/ventas', Require('./routes/private/ventasRoutes'))
app.use('/api/ordenes-compra', Require('./routes/private/ordenCompraRoutes'))