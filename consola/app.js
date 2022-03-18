const fs = require("fs");
const path = require('path')

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
        // TODO: solicitar Datos
        const nombre = await leerInput("Nombre carpeta:");
        const nombrePath = path.join(__dirname, '../src/views/app/config-one/', nombre)
        const endPoint = await leerInput("End Point:");
        let camposListado = await leerInput("Campos Listado:");
        camposListado = camposListado.split(",");
        let camposRequeridos = await leerInput("Campos Requeridos:");
        


        const crear = new Crear(nombre,nombrePath, endPoint, camposListado, camposRequeridos)
        // TODO: Creamos la carpeta
        fs.mkdirSync(`${nombrePath}`, { recursive: true });
        crear.main()


        // * creamos el indexGlobal
        const nombreCapitalizado = nombre[0].toUpperCase() + nombre.slice(1)        
        const archivoIndexGlobal = fs.readFileSync('C:/Users/CHELO/Desktop/PIAR/clinical-laboratory-frontend/src/views/app/config-one/index.js', 'utf8')
        const result = archivoIndexGlobal.replace('<Redirect to="/error" />', '<Route path={`${match.url}/'+nombre+'`} render={props => <'+nombreCapitalizado+' {...props} />} />\n<Redirect to="/error" />' )
        fs.writeFileSync('C:/Users/CHELO/Desktop/PIAR/clinical-laboratory-frontend/src/views/app/config-one/index.js', result)
        
        break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
