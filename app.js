const colors = require("colors");
const fs = require("fs");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  completarTareas,
} = require("./helpers/inquirer");
const Tareas = require("./models/Tareas");

console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.tareasFromArray(tareasDB);
  }

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
        // TODO: Creamos la carpeta
        fs.mkdirSync(`./${nombreFolder}`, { recursive: true });

        // TODO: Creamos el archivo index
        // Creamos los archivos
        const index = fs.readFileSync("./templates/index.txt", "utf-8");
        const list = fs.readFileSync("./templates/list.txt", "utf-8");
        const edit = fs.readFileSync("./templates/edit.txt", "utf-8");
        const add = fs.readFileSync("./templates/add.txt", "utf-8");

        const nombreClase =
          nombreFolder[0].toUpperCase() + nombreFolder.slice(1);

        const result = index.replace(/{nombreClase}/g, nombreClase);
        // crea el index
        fs.writeFile(`./${nombreFolder}/index.js`, result, (err) => {
          if (err) throw err;
          console.log("The file was succesfully saved!");
        });
        // TODO: Creamos el archivo list
        // crea el listar
        let campos = camposListado.map((campo) => {
          const header = campo[0].toUpperCase() + campo.slice(1);
          return `{
              Header: '${header}',
              cellClass: 'list-item-heading w-40',
              accessor: '${campo}'
            },`;
        });
        let resultlist = list.replace(/{endpoint}/g, endPoint);
        resultlist = resultlist.replace(/{campos}/g, campos);

        fs.writeFile(`./${nombreFolder}/list.js`, resultlist, (err) => {
          if (err) throw err;
          console.log("The file was succesfully saved!");
        });

        // TODO: Creamos el archivo update
        camposRequeridos = camposRequeridos.split(",");
        camposRequeridos = camposRequeridos.map((camR) => {
          return `${camR}: Yup.string().required('${camR} is required!')`;
        });
        let resultUpdate = edit.replace(
          /{camposRequeridos}/g,
          camposRequeridos
        );
        resultUpdate = resultUpdate.replace(/{endpoint}/g, endPoint);

        let valoresIniciales = camposListado.map((campo) => {
          return `${campo}: data.${campo}`;
        });

        resultUpdate = resultUpdate.replace(
          /{initialValue}/g,
          valoresIniciales
        );

        let formularioCampos = ``;
        camposListado.forEach((campo) => {
          formularioCampos += `<FormGroup className="form-group has-float-label">
            <Label>
              <IntlMessages id="form.${campo}" />
            </Label>
            <Field className="form-control" name="${campo}" />
            {errors.${campo} && touched.${campo} ? (
              <div className="invalid-feedback d-block">
                {errors.${campo}}
              </div>
            ) : null}
          </FormGroup>`;
        });
        resultUpdate = resultUpdate.replace(/{formCampos}/g, formularioCampos);
        fs.writeFile(`./${nombreFolder}/edit.js`, resultUpdate, (err) => {
          if (err) throw err;
          console.log("The file was succesfully saved!");
        });

        resultUpdate = resultUpdate.replace(/{formCampos}/g, formularioCampos);

        // TODO: Creamos el archivo create
        let resultCreate = add.replace(/{camposRequeridos}/g, camposRequeridos);

        resultCreate = resultCreate.replace(/{endpoint}/g, endPoint);
        resultCreate = resultCreate.replace(/{formCampos}/g, formularioCampos);

        let iniciales = camposListado.map((campo) => {
          return `${campo}: ''`;
        });
        resultCreate = resultCreate.replace(/{inicialValue}/g, iniciales);

        fs.writeFile(`./${nombreFolder}/add.js`, resultCreate, (err) => {
          if (err) throw err;
          console.log("The file was succesfully saved!");
        });

        break;

      case "2": // listamos tareas
        console.log("");
        console.log(tareas.listadoCompleto());
        break;
      case "3":
        // listamos las tareas Completas
        console.log("");
        console.log(tareas.listarCompletos());

        break;
      case "4":
        // Listamos tareas pendientes
        console.log("");
        console.log(tareas.listarPendientes());
        break;
      case "5":
        // Completar tareas
        console.log("");
        const tars = leerDB();
        const uid = await completarTareas(tars);
        tareas.completarTareas(uid);
        break;
      case "6":
        // eliminamos tarea
        const tareasBD = leerDB();
        const id = await listadoTareasBorrar(tareasBD);
        const ok = await confirmar(`¿ Estas Seguro ? `);
        if (ok) {
          tareas.borrarTarea(id);
        }
        break;
    }

    guardarDB(tareas.listarTareas);

    await pausa();
  } while (opt !== "0");
};

main();
