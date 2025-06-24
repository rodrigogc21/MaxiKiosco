import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/carritoContext";
import LoginCliente from "./pages/LoginCliente";
import Carrito from "./pages/Carrito"
import AdminPanel from './pages/AdminPanel';
import HomeCliente from './pages/HomeCliente';
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import ProductosPorCategoria from "./pages/ProductosPorCategoria";
import UsuariosAdmin from "./pages/UsuarioAdmin"
import ProveedoresAdmin from "./pages/ProveedoresAdmin";
import VistaCategorias from "./pages/VistaCategorias"
import Layout from "./components/Layout";
import Registro from "./pages/Registro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <CarritoProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginCliente />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cliente" element={<HomeCliente />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos/:id" element={<ProductosPorCategoria />} />
            <Route path="/categorias" element={<VistaCategorias />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
            <Route path="/admin/proveedores" element={<ProveedoresAdmin />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
            </Layout>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </CarritoProvider>
    </Router>
  )
}

export default App;
