
const fs = require("fs");
const path = require('path')
const pathAll = path.join(__dirname, './templates/')
const index = fs.readFileSync(`${pathAll}index.txt`, "utf-8");
const list = fs.readFileSync(`${pathAll}list.txt`, "utf-8");
const edit = fs.readFileSync(`${pathAll}edit.txt`, "utf-8");
const add = fs.readFileSync(`${pathAll}add.txt`, "utf-8");

module.exports = class Crear {

    constructor(nombre, nombreFolder, endPoint, camposListado, camposRequeridos) {
        this.nombreFolder = nombreFolder
        this.endPoint = endPoint
        this.camposListado = camposListado
        this.camposRequeridos = camposRequeridos
        this.camposRequeridosasd()
        this.nombreMenu = nombre
    }
    crearIndex() {
        const nombreClase = this.nombreFolder[0].toUpperCase() + this.nombreFolder.slice(1);
        const result = index.replace(/{nombreClase}/g, nombreClase);
        // crea el index
        fs.writeFile(`${this.nombreFolder}/index.js`, result, (err) => {
            if (err) throw err;
        });
    }

    crearList() {
        let campos = this.camposListado.map((campo) => {
            const header = campo[0].toUpperCase() + campo.slice(1);
            return `{
                Header: '${header}',
                cellClass: 'list-item-heading w-40',
                accessor: '${campo}'
              },`;
        });
        let resultlist = list.replace(/{endpoint}/g, this.endPoint);
        resultlist = resultlist.replace(/{campos}/g, campos);
        resultlist = resultlist.replace(/{menu}/g, `menu.${this.nombreFolder.toLowerCase()}`);

        fs.writeFile(`${this.nombreFolder}/list.js`, resultlist, (err) => {
            if (err) throw err;
        });
    }

    camposRequeridosasd() {
        this.camposRequeridos = this.camposRequeridos.split(",");
        this.camposRequeridos = this.camposRequeridos.map((camR) => {
            return `${camR}: Yup.string().required('${camR} is required!')`;
        });
    }

    crearEdit() {

        let resultUpdate = edit.replace(
            /{camposRequeridos}/g,
            this.camposRequeridos
        );
        resultUpdate = resultUpdate.replace(/{endpoint}/g, this.endPoint);

        let valoresIniciales = this.camposListado.map((campo) => {
            return `${campo}: data.${campo}`;
        });

        resultUpdate = resultUpdate.replace(
            /{initialValue}/g,
            valoresIniciales
        );

        const formularioCampos = this.generarFormularios()
        resultUpdate = resultUpdate.replace(/{formCampos}/g, formularioCampos);
        resultUpdate = resultUpdate.replace(/{menu}/g, `menu.${this.nombreMenu.toLowerCase()}`);
        resultUpdate = resultUpdate.replace(/{form}/g, `form.edit${this.nombreMenu.toLowerCase()}`);


        fs.writeFile(`${this.nombreFolder}/edit.js`, resultUpdate, (err) => {
            if (err) throw err;
            console.log("The file was succesfully saved!");
        });

    }

    crearAdd() {
        const formularioCampos = this.generarFormularios()
        let resultCreate = add.replace(/{camposRequeridos}/g, this.camposRequeridos);

        resultCreate = resultCreate.replace(/{endpoint}/g, this.endPoint);
        resultCreate = resultCreate.replace(/{formCampos}/g, formularioCampos);
        resultCreate = resultCreate.replace(/{menu}/g, `menu.${this.nombreFolder.toLowerCase()}`);
        resultCreate = resultCreate.replace(/{form}/g, `form.add${this.nombreFolder.toLowerCase()}`);

        let iniciales = this.camposListado.map((campo) => {
            return `${campo}: ''`;
        });
        resultCreate = resultCreate.replace(/{inicialValue}/g, iniciales);

        fs.writeFile(`${this.nombreFolder}/add.js`, resultCreate, (err) => {
            if (err) throw err;
            console.log("Los archivos se creador presione Enter!");
        });
    }


    generarFormularios() {
        let formularioCampos = ``;
        this.camposListado.forEach((campo) => {
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
        return formularioCampos
    }

    main() {
        this.crearIndex()
        this.crearList()
        this.crearEdit()
        this.crearAdd()
    }

}