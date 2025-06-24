const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Rutas públicas
app.use('/api/productos', require('./routes/public/verProductosRoutes'))
app.use('/api/auth', require('./routes/public/authRoutes'))
app.use('api/carrito', require('./routes/public/carritoRoutes'))

//Rutas privadas
app.use('/api/modificar-productos', require('./routes/private/crudProductosRoutes'))
app.use('/api/usuarios', require('./routes/private/usuariosRoutes'))
app.use('/api/proveedores', require('./routes/private/proveedoresRoutes'))
app.use('/api/categorias', require('./routes/private/categoriasRoutes'))
app.use('/api/ventas', require('./routes/private/ventasRoutes'))
app.use('/api/ordenes-compra', require('./routes/private/ordenCompraRoutes'))



