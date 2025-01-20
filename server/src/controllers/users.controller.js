const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");
const pathFile = path.resolve(__dirname, "../../data/users.json");
const usersController = {};

usersController.getAllUsers = (req, res) => {
  /*Primero leemos*/
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      /*enviamos una respuesta de error*/
      res.status(500).json({ error: "Error al leer el archivo" });
    } else {
      /*Guardamos la información leida*/
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    }
  });
};

usersController.getUserById = (req, res) => {
  const { id } = req.params;
  // esto es igual a const (id = req.params.id) pero con esta manera hay que hacer una línea por constante, en la otra podemos meter las constantes en los {}

  fs.readFile(pathFile, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Error al leer el archivo" });
    } else {
      // pasamos el dato json a js para poder tratarlo y buscar el usuario
      const jsonData = JSON.parse(data);
      // buscamos el usuario por id
      const userFound = jsonData.find((user) => user.userId === id);
      if (userFound) {
        res.status(200).json(userFound);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    }
  });
};

usersController.createNewUser = (req, res) => {
  /*Los nuevos datos que introducimos están en req.body y ademas le metemos un id*/
  const newUser = { userId: v4(), ...req.body };
  /*Primero Leer los datos disponibles*/
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      /*enviamos una respuesta de error si no se ha leido bien*/
      res.status(500).json({ error: "Error al leer el archivo" });
    } else {
      /*guardar los datos originales*/
      const jsonData = JSON.parse(data);
      /*guardar los datos originales + los nuevos que introucidmos de new data*/
      const newData = [...jsonData, newUser];
      /*Tenemos todos los datos en newData, ahora tenemos que escribirlos*/
      fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
        if (error) {
          res.status(500).json({ error: "Error al guardar la informacion" });
        } else {
          res.status(201).json(newData);
        }
      });
    }
  });
};

usersController.deleteUser = (req, res) => {
  /*buscar por id*/
  const userId = req.params.id;
  /*primero leer*/
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      /*enviamos una respuesta de error si no se ha leido bien*/
      res.status(500).json({ error: "Error al leer el archivo" });
    } else {
      /*guardar los datos originales*/
      const jsonData = JSON.parse(data);
      /*econtrar el usuario por el id y con filter, queremos que nos muestre todos menos ese para borrarlo*/
      const usersUpdate = jsonData.filter((user) => user.userId !== userId);
      /*escribir lo nuevo*/
      fs.writeFile(pathFile, JSON.stringify(usersUpdate), (error) => {
        if (error) {
          res.status(500).json({ error: "Error al guardar la informacion" });
        } else {
          res.status(202).json(usersUpdate);
        }
      });
    }
  });
};

usersController.updateUsers = (req, res) => {
  /*buscar por id*/
  const userId = req.params.id;
  const userData = req.body;
  /*primero leemos para buscar*/
  fs.readFile(pathFile, (error, data) => {
    if (error) {
      /*enviamos una respuesta de error si no se ha leido bien*/
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    /*guardar los datos originales*/
    const jsonData = JSON.parse(data);
    /*econtrar el usuario por el id, pero tenemos que encontrarlo por posicion porque por id lo guarda de nuevo y tenemos dos usuarios con el mismo id*/
    const userFound = jsonData.find((user) => user.userId === userId);
    if (!userFound) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // para escribir los nuevos datos es mejor esta forma que recoge todo
    const userUpdated = { ...userFound, ...userData };

    const usersUpdated = jsonData.map((user) => {
      if (user.userId === userUpdated.userId) {
        user = userUpdated;
      }
      return user;
    });

    /*escribir los nuevos datos aunque esta es una forma antigua
      userFound.name = req.body.name || userFound.name;
      userFound.email = req.body.email || userFound.email;*/
    /*escribir lo nuevo*/

    fs.writeFile(pathFile, JSON.stringify(usersUpdated), (error) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error al guardar la informacion" });
      }
      return res.status(202).json(userUpdated);
    });
  });
};

module.exports = usersController;
