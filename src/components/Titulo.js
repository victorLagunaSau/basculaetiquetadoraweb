import React from "react";
import "./Titulo.css"; // Importa los estilos específicos del título

function Titulo() {
  return (
    <div className="navbar">
      <div className="nombre-app">Báscula Etiquetadora Web</div>
      <div className="nombre-tienda">Mi Tienda</div>
      <div className="logo">LOGO</div>
    </div>
  );
}

export default Titulo;