import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const toastAgregadoRef = useRef(false);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    toastAgregadoRef.current = false;
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item._id === producto._id);
      if (existente) {
        return prev.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        if (!toastAgregadoRef.current) {
          toast.success(`${producto.nombre} agregado al carrito`);
          toastAgregadoRef.current = true;
        }
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const nuevo = prev.filter((item) => item._id !== id);
      if (prev.length !== nuevo.length) {
        toast.info("Producto eliminado del carrito");
      }
      return nuevo;
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    toast.info("Carrito vaciado");
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
