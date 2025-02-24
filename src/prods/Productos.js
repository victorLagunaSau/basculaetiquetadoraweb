import React, { useState } from "react";
import productos from "../data/productos.json"; // Importa los datos de productos
import "./Productos.css"; // Importa los estilos específicos de productos

function Productos({ seleccionarProducto }) {
  // Agrupar productos por línea
  const productosPorLinea = productos.reduce((acc, producto) => {
    if (!acc[producto.linea]) {
      acc[producto.linea] = [];
    }
    acc[producto.linea].push(producto);
    return acc;
  }, {});

  // Obtener las líneas disponibles
  const lineas = Object.keys(productosPorLinea);

  // Estado para la línea seleccionada
  const [lineaSeleccionada, setLineaSeleccionada] = useState(lineas[0]);

  // Obtener los productos de la línea seleccionada
  const productosLinea = productosPorLinea[lineaSeleccionada] || [];

  // Calcular el número de botones vacíos necesarios
  const botonesVacíos = Math.max(0, 20 - productosLinea.length);

  return (
    <div className="productos-container">
      {/* Selector de línea */}
      <div className="selector-linea">
        {lineas.map((linea) => (
          <button
            key={linea}
            className={`boton-linea ${linea === lineaSeleccionada ? "activo" : ""}`}
            onClick={() => setLineaSeleccionada(linea)}
          >
            Línea {linea}
          </button>
        ))}
      </div>

      {/* Cuadrícula de productos */}
      <div className="productos-grid">
        {productosLinea.map((producto) => (
          <button
            key={producto.linea + producto.nombre}
            className="boton-producto"
            onClick={() => seleccionarProducto(producto)}
          >
            <span>{producto.nombre}</span>
            <span>${producto.precio.toFixed(2)}</span>

          </button>
        ))}

        {/* Botones vacíos */}
        {Array.from({ length: botonesVacíos }).map((_, index) => (
          <button key={`vacio-${index}`} className="boton-producto vacio" disabled>
            Vacío
          </button>
        ))}
      </div>
    </div>
  );
}

export default Productos;