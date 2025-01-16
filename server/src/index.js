const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const corsOptions = {
  origin: "*", // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio) Desde donde vamos a poder hacer peticiones al servidor, el asterisco quiere decir que se pueden hacer peticion desde cualquier parte, luego se cambia al dominio del server.
  methods: ["GET", "POST", "PATCH", "DELETE"], // Métodos permitidos Los métodos son los que vamos a aceptar,
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos. Que cabeceras de peticion permitimos, solo vamos a usar de que avisan que estmos usando contenido
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
