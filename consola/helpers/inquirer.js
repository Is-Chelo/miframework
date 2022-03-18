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


module.exports = {
    inquireMenu,
    pausa,
    leerInput
}