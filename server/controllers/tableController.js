const Table = require("../model/Table");



exports.hello = (req,res) => {
    res.send({
        message: "Hello"
    })
}

exports.newTable = async(req,res) => {
    const _newTable = new Table({
        Tabla:
            {
                "col1":"val1",
                "col2":"val2",
                "col3":"val1"
            }
    })

    _newTable
        .save(_newTable)
        .then(data =>{
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};

exports.newTableResult = async(req,res) => {
    const _newTable = new Table({
        Tabla:
            {
                columns:[
                    "col1",
                    "col2",
                    "col3"
                ],

                entries:[
                    [
                    "val1",
                    "val2",
                    null
                    ],
                    
                    [
                    "val2",
                    "val3"
                    ]
                ]
            }
    })

    _newTable
        .save(_newTable)
        .then(data =>{
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};


exports.newTableArray = async(req,res) => {
    const _newTable = new Table({
        Tabla:
            {
                "col1":[
                    "val1",
                    "val2",
                    "val3"
                ],

                "col2":[
                    null,
                    "val2",
                    "val3"
                ]
            }
    })

    _newTable
        .save(_newTable)
        .then(data =>{
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};

exports.getRandomTable = async(req,res) => {
    await Table.findOne().skip(Math.floor(Math.random()* await Table.count()))
        .then(table => {
            console.log(table)
            res.send(table)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Oops"
            });
        });
};