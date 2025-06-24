import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/carritoContext";
import LoginCliente from "./pages/LoginCliente";
import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import ProductosPorCategoria from "./pages/ProductosPorCategoria";
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
            <Route path="/home" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos/:id" element={<ProductosPorCategoria />} />
            <Route path="/login" element={<LoginCliente />} />

          </Routes>
        </Layout>

        {/* 🔔 Contenedor de los toasts */}
        <ToastContainer position="bottom-right" autoClose={2000} />
      </CarritoProvider>
    </Router>
  );
};

export default App;
