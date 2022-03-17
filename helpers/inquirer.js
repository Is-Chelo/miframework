const inquirer = require('inquirer');

require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer? ',
    choices: [
        {
            value: '1',
            name: `${"1.".green} Crear Tarea`
        },
        {
            value: '2',
            name: `${"2.".green} Listar tareas`
        },
        {
            value: '3',
            name: `${"3.".green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${"4.".green} Listar tareas Pendientes`
        },
        {
            value: '5',
            name: `${"5.".green} Completar Tarea(s)`
        },
        {
            value: '6',
            name: `${"6.".green} Borrar Tarea`
        },
        {
            value: '0',
            name: `${"0.".green} Salir`
        },

    ]
}]


const inquireMenu = async () => {

    console.clear()
    console.log("==============================".green);
    console.log("   Seleccione una opcion");
    console.log("==============================\n".green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}


const pausa = async () => {
    console.log("\n")
    await inquirer.prompt([{
        type: 'input',
        name: 'opcion',
        message: `Presione ${"ENTER".green} para continuar`,
    }]);
    return;
}

const leerInput = async (message) => {
    const { desc } = await inquirer.prompt([{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return "Por favor ingrese un valor";
            }
            return true;
        }
    }]);
    return desc;
}


const listadoTareasBorrar = async (tareas) => {
    let preguntas = [];

    tareas.forEach((tarea, i) => {
        const id = `${i + 1}.`.green;
        preguntas.push(
            {
                value: `${tarea.id}`,
                name: `${id} ${tarea.descripcion}`
            }
        )
    });

    const opciones = [{
        type: 'list',
        name: 'op',
        message: 'Que tarea deseas Borrar? ',
        choices: preguntas
    }]
    const { op } = await inquirer.prompt(opciones);
    return op;

}


const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'res',
            message
        }
    ]
    const { res } = await inquirer.prompt(question);
    return res;
}


const completarTareas = async(tareas)=>{
    const listaTareas = tareas.map((tarea, i)=>{
        const idx = `${i+1}.`.green;
        return {
            value:`${tarea.id}`,
            name:`${idx} ${tarea.descripcion}`,
            checked:tarea.completado?true:false
        }
    })


    const opciones = [{
        type: 'checkbox',
        name: 'op',
        message:"Selecciones",
        choices: listaTareas
    }]

    const { op } = await inquirer.prompt(opciones);
    return op;
}


module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    completarTareas
}

