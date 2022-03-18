const fs = require("fs");
const {
  inquireMenu,
  pausa,
  leerInput,
} = require("./helpers/inquirer");

const Crear = require('./crearArchivos')


console.clear();
const main = async () => {
  let opt = "";

  do {
    // imprimir el menu***
    opt = await inquireMenu();

    switch (opt) {
      case "1":
        // creamos tarea
        const nombreFolder = await leerInput("Nombre carpeta:");
        const endPoint = await leerInput("End Point:");
        let camposListado = await leerInput("Campos Listado:");
        camposListado = camposListado.split(",");
        let camposRequeridos = await leerInput("Campos Requeridos:");

        const crear = new Crear(nombreFolder, endPoint, camposListado, camposRequeridos)

        // TODO: Creamos la carpeta
        fs.mkdirSync(`./${nombreFolder}`, { recursive: true });

        crear.crearIndex()
        
        crear.crearList()
        
        crear.crearEdit()
        
        crear.crearAdd()
        
        break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
