const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    // Funcion para crear las tareas;
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // funcion para listar Tareas
    get listarTareas() {
        let listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    tareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea
        })
    }

    listadoCompleto = () => {
        const listado = this.listarTareas
        listado.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { descripcion, completado } = tarea;
            const estado = (completado) ? "Completado".green : "Pendiente".red

            const dataString = `${idx} ${descripcion} :: ${estado}`
            console.log(dataString)
        })
    }
    listarPendientes = () => {

        const listado = this.listarTareas
        listado.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { descripcion, completado } = tarea;

            if(completado==null){
                const dataString = `${idx} ${descripcion}`
                console.log(dataString)
            }
        })
    }
    listarCompletos = () => {

        const listado = this.listarTareas
        listado.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { descripcion, completado } = tarea;

            if(completado!=null){
                const dataString = `${idx} ${descripcion} :: ${tarea.completado}`
                console.log(dataString)
            }
        })
    }


    completarTareas = (ids =[]) =>{
        
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completado){
                tarea.completado=new Date().toString();
            }
            
        });
    
        this.listarTareas.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = null;
            }
        });
    
    }


    borrarTarea = (id)=>{
        delete this._listado[id];
    }

}

module.exports = Tareas;