# 📄 Documentación del Proyecto: Sistema de Gestión para Maxikiosco

## 1. Introducción

Este proyecto consiste en una aplicación web desarrollada para la gestión integral de un maxikiosco. Su propósito principal es permitir la administración eficiente de productos, categorías, proveedores y usuarios, facilitando las tareas diarias del negocio como el control de stock, registros de compras y organización del inventario.

## 2. Tecnologías utilizadas

- **Frontend**: React con Vite  
- **Backend**: Node.js + Express  
- **Base de datos**: MySQL  
- **Control de versiones**: Git + GitHub  
- **Gestión de estado (frontend)**: React Context  
- **Estilos**: Bootstrap  
- **Autenticación**: JWT con roles

## 3. Requisitos del sistema

- Node.js v18+  
- MySQL Server  
- Git  
- Navegador moderno (Chrome, Firefox, etc.)

## 4. Instalación

### Backend
cd backend
npm install

Configurar un archivo .env con las credenciales de la base de datos:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=maxikiosco
DB_PORT=3006
PORT=3001
JWT_SECRET=secreto

Luego ejecutar:
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## 5. Estructura del proyecto

MaxiKiosco/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── Middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── app.js
│
├── frontend/
     ├── public/
     └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── App.jsx

## 6. Funcionalidades Principales (CRUDs)

Usuarios
Alta, baja, modificación y listado de usuarios.
Roles diferenciados (admin, vendedor, etc.).
Validación de correo único y campos obligatorios.
Login con autenticación basada en JWT.

Productos
Registro de productos con nombre, precio, stock y categoría.
Modificación de datos en tiempo real.
Baja lógica o eliminación definitiva.
Listado ordenado y búsqueda por nombre o categoría.

Categorías
Gestión de categorías de productos.
Vinculación entre productos y categorías.
Protección ante eliminación de categorías con productos asociados.

Proveedores
Registro de proveedores con razón social, CUIT, correo, dirección y teléfono.
CRUD completo desde la interfaz React.
Validación de CUIT y correo.

## 7. Base de datos

Modelo relacional en MySQL.
Uso de stored procedures para operaciones complejas, como procesar una venta, calcular totales o insertar detalles de compra.
Integridad referencial mediante claves foráneas.

Tablas principales:
usuario
producto
categoria
proveedor
orden_compra
detalle_orden_compra
carrito
venta

## 8. Consideraciones técnicas
Se utilizaron middlewares personalizados para validaciones y manejo de errores.
Rutas protegidas mediante verificación de tokens JWT y control de roles.
React Context se utiliza como mecanismo de estado global en el frontend.
El backend está estructurado de forma modular: rutas, controladores, modelos y configuración.

## 9. Posibles mejoras
Agregar dashboard con métricas visuales del negocio.
Incorporar paginación y filtros avanzados por rango de fechas, categoría o proveedor.
Exportación de reportes en formato PDF o Excel.
Envío de alertas por stock bajo vía correo electrónico.
Testing automatizado con Jest o Supertest.
    
## 10. Conclusión
El sistema de gestión para maxikiosco desarrollado permite cubrir las operaciones básicas del negocio de forma eficiente. Su diseño modular y uso de tecnologías modernas permite escalar y mantener el sistema con facilidad. La implementación de autenticación con JWT y control de roles asegura un entorno seguro y adecuado para distintos tipos de usuarios.
