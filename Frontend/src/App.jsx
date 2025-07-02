import React from "react";
import { Routes, Route } from "react-router-dom";
import RutaProtegida from './components/RutaProtegida'
import LayoutB from "./components/LayoutB";
import HomeB from "./pages/HomeB";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import CategoriasProd from "./pages/CategoriasProd";
import Carrito from "./components/Carrito";
import Menu from "./components/Menu";
import CrudProductos from './pages/CrudProductos';
import CrudUsuarios from './pages/CrudUsuarios';
import CrudCategorias from './pages/CrudCategorias';
import CrudProveedores from './pages/CrudProveedores';

const App = () => {
  return (
          <Routes>
            <Route path="/" element={<LayoutB />}>
              <Route index element={<HomeB />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/catalogo" element={<CategoriasProd />} />
              <Route path="/carrito" element={<Carrito />} />
            </Route>

            <Route
            path="/menu"
            element={
              <RutaProtegida allowedRoles={['admin', 'empleado']}>
                <Menu />
              </RutaProtegida>
            }
           />

          <Route
          path="/productos"
          element={
            <RutaProtegida allowedRoles={['admin', 'empleado']}>
              <CrudProductos />
            </RutaProtegida>
          }
         />

         <Route
         path="/usuarios"
         element={
          <RutaProtegida allowedRoles={['admin', 'empleado']}>
            <CrudUsuarios />
          </RutaProtegida>
          }
         />

        <Route
         path="/categorias"
         element={
          <RutaProtegida allowedRoles={['admin']}>
            <CrudCategorias />
          </RutaProtegida>
         }
        />

        <Route
        path="/proveedores"
        element={
          <RutaProtegida allowedRoles={['admin']}>
            <CrudProveedores />
          </RutaProtegida>
         }
        />
          </Routes>
  );
};

export default App;
