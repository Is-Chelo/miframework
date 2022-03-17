const fs = require("fs");

const path = "./db/data.json";  // hace la referencia al archivo

const guardarDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data))
}

const leerDB=()=>{
    if(!fs.existsSync(path)){
        return null;
    }
    const info = fs.readFileSync(path, { encoding:'utf-8'   });
    return JSON.parse(info);
}


module.exports = {
    guardarDB,
    leerDB
}
