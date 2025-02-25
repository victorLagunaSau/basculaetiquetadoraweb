require("dotenv").config();
const express = require("express");
const SerialPort = require("serialport");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors()); // Permite que React se comunique con el backend
app.use(express.json());

// Configurar el puerto serie (ajusta el puerto según tu sistema)
const serialPort = new SerialPort.SerialPort({
  path: process.env.SERIAL_PORT, // Cambiar según el sistema
  baudRate: 9600, // Ajusta la velocidad según la báscula
});

serialPort.on("open", () => {
  console.log("Puerto serie abierto");
});

serialPort.on("error", (err) => {
  console.error("Error en el puerto serie:", err);
});

// Función para enviar un comando a la báscula (si es necesario)
const enviarComando = (comando) => {
  serialPort.write(comando, (err) => {
    if (err) {
      console.error("Error al enviar comando:", err);
    } else {
      console.log("Comando enviado:", comando);
    }
  });
};

// Ruta para obtener el peso desde la báscula
app.get("/peso", (req, res) => {
  // Enviar comando para solicitar el peso (si es necesario)
  enviarComando("P\n"); // Cambia "P" por el comando correcto si es diferente

  // Leer el peso desde el puerto serie
  serialPort.once("data", (data) => {
    const peso = data.toString().trim();
    res.json({ peso });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});