// const usersController = [];
// const fs = require("fs");
// const path = require("path");
// const pathFile = path.resolve(__dirname, "../../data/users.json");

// usersController.getAllUsers = (req, res) => {
//   /*Primero leemos*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*Guardamos la información leida*/
//       const jsonData = JSON.parse(data);
//       res.status(200).json(jsonData);
//     }
//   });
// };

// usersController.createNewUser = (req, res) => {
//   /*Los nuevos datos que introducimos son en req.body*/
//   const newUser = req.body;
//   /*Primero Leer los datos disponibles*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*guardar los datos originales + los nuevos que introucidmos de new data*/
//       const newData = [...jsonData, newUser];
//       /*Tenemos todos los datos en newData, ahora tenemos que escribirlos*/
//       fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(201).json(newData);
//         }
//       });
//     }
//   });
// };

// usersController.deleteUser = (req, res) => {
//   /*buscar por id*/
//   const userId = req.params.id;
//   /*primero leer*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuario por el id y con filter, queremos que nos muestre todos menos ese para borrarlo*/
//       const usersUpdate = jsonData.filter((user) => user.userId !== userId);
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(usersUpdate), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(usersUpdate);
//         }
//       });
//     }
//   });
// };

// usersController.updateUsers = (req, res) => {
//   /*buscar por id*/
//   const userId = req.params.id;
//   /*primero leemos para buscar*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuari por el id*/
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json(userFound);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//       /*escribir los nuevos datos*/
//       userFound.name = req.body.name || userFound.name;
//       userFound.email = req.body.email || userFound.email;
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(jsonData);
//         }
//       });
//     }
//   });
// };

// usersController.getUserById = (req, res) => {
//   const userId = req.params.id;

//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       const jsonData = JSON.parse(data);
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json([userFound]);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//     }
//   });
// };

// module.exports = usersController;
