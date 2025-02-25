import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import "./Etiqueta.css";

function Etiqueta({ producto, peso, onClose }) {
  const [codigoEAN, setCodigoEAN] = useState("");

  useEffect(() => {
    if (producto && producto.codigo) {
      const codigoProducto = producto.codigo.toString().padStart(5, "0");
      const pesoNumerico = parseFloat(peso).toFixed(2).replace(".", "");

      const base = `200${codigoProducto}${pesoNumerico}`;

      let suma = 0;
      for (let i = 0; i < base.length; i++) {
        const digito = parseInt(base[i], 10);
        suma += i % 2 === 0 ? digito : digito * 3;
      }
      const digitoVerificador = (10 - (suma % 10)) % 10;
      const codigoFinal = base + digitoVerificador;

      setCodigoEAN(codigoFinal);
    }
  }, [producto, peso]);

  return (
    <div className="etiqueta-overlay">
      <div className="etiqueta-popup">
        <h2>Etiqueta de Producto</h2>
        <p>{producto?.nombre}</p>
        <p>Peso: {peso}</p>
        <p>Precio: ${producto?.precio}</p>

        {codigoEAN && (
          <div className="codigo-barras">
            <Barcode value={codigoEAN} format="EAN13" />
          </div>
        )}

        <button className="boton-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Etiqueta;
