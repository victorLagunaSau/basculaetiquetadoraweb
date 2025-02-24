import React, { useState, useEffect } from "react";
import "./css/styles.css"; // Importa el archivo CSS
import Productos from "./prods/Productos"; // Importa el componente Productos
import Titulo from "./components/Titulo"; // Importa el componente Titulo

function App() {
  const [peso, setPeso] = useState("0.000 kg"); // Estado para almacenar el peso
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para el producto seleccionado
  const [precioCalculado, setPrecioCalculado] = useState(0); // Estado para el precio calculado

  // Función para obtener el peso desde el backend
  const obtenerPeso = async () => {
    try {
      const response = await fetch("http://localhost:4000/peso");
      const data = await response.json();
      setPeso(data.peso); // Actualiza el estado con el peso recibido

      // Si hay un producto seleccionado, recalcula el precio
      if (productoSeleccionado) {
        const pesoNumerico = parseFloat(data.peso); // Convierte el peso a número
        const precio = (pesoNumerico * productoSeleccionado.precio).toFixed(2); // Calcula el precio
        setPrecioCalculado(precio);
      }
    } catch (error) {
      console.error("Error al obtener el peso:", error);
    }
  };

  // Actualizar el peso cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      obtenerPeso();
    }, 2000); // 2000 ms = 2 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [productoSeleccionado]); // Dependencia: productoSeleccionado

  // Función para manejar la selección de un producto
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    const pesoNumerico = parseFloat(peso); // Convierte el peso a número
    const precio = (pesoNumerico * producto.precio).toFixed(2); // Calcula el precio
    setPrecioCalculado(precio);
  };

  return (
    <div className="container">
      {/* Módulo 1: Título */}
      <Titulo />

      {/* Módulo 2: Productos */}
      <Productos seleccionarProducto={seleccionarProducto} />

      {/* Módulo 3: Información inferior */}
      <div className="informacion">
        <div className="peso">
          <p>Peso actual:</p>
          <h2>{peso}</h2>
        </div>
        <div className="detalle-producto">
          <p>
            {productoSeleccionado
              ? `Producto seleccionado: ${productoSeleccionado.nombre}`
              : "Ningún producto seleccionado"}
          </p>
          <p>
            {productoSeleccionado
              ? `Precio: $${precioCalculado}`
              : "Selecciona un producto para calcular el precio"}
          </p>
        </div>
        <button className="boton-imprimir">Imprimir</button>
      </div>
    </div>
  );
}

export default App;