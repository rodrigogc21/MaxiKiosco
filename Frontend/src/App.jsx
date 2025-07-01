import React from "react";
import { Routes, Route } from "react-router-dom";
import RutaProtegida from './components/RutaProtegida'
import LayoutB from "./components/LayoutB";
import HomeB from "./pages/HomeB"
import Login from "./pages/Login"
import Registro from "./pages/Registro";
import CategoriasProd from "./pages/CategoriasProd";
import Carrito from "./components/Carrito"
import Menu from "./components/Menu"
import CrudProductos from './pages/CrudProductos';

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

          </Routes>
  );
};

export default App;
