const Table = require("../model/Table");
const fs = require('fs');
const path = require('path');
const Resultado = require("../model/Resultado");
const { default: mongoose } = require("mongoose");
const { schema } = require("../model/Table");


exports.hello = (req, res) => {
    res.send({
        message: "Hello"
    })
}
exports.newTable = async (req, res) => {
    const _newTable = new Table({
        Tabla:
        {
            "col1": "val1",
            "col2": "val2",
            "col3": "val1"
        }
    })

    _newTable
        .save(_newTable)
        .then(data => {
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};
exports.newTableResult = async (req, res) => {
    const _newTable = new Table({
        Tabla:
        {
            columns: [
                "col1",
                "col2",
                "col3"
            ],

            entries: [
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
        .then(data => {
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};
exports.newTableArray = async (req, res) => {
    const _newTable = new Table({
        Tabla:
        {
            "table-1652-79": {
                "title": [
                    "Year",
                    "Gold",
                    "Silver",
                    "Bronze"
                ],
                "numCols": 4,
                "numericColumns": [],
                "pgTitle": "FIS Freestyle World Ski Championships",
                "numDataRows": 5,
                "secondTitle": "Ski cross",
                "numHeaderRows": 1,
                "caption": "Ski cross",
                "data": [
                    [
                        "2005 Ruka",
                        "Tomas Kraus",
                        "Jesper Brugge",
                        "Audun Groenvold"
                    ],
                    [
                        "2007 Madonna di Campiglio",
                        "Tomas Kraus",
                        "Stanley Hayer",
                        "Enak Gavaggio"
                    ],
                    [
                        "2009 Inawashiro",
                        "Andreas Matt",
                        "Thomas Zangerl",
                        "Davey Barr"
                    ]
                ]
            }
        }
    })

    _newTable
        .save(_newTable)
        .then(data => {
            res.send("Tabla creada correctamente")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "ERROR"
            });
        });
};


exports.getRandomTable = async (req, res) => {
    await Table.findOne().skip(Math.floor(Math.random() * await Table.count()))
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

exports.tablas = async (req, res) => {
    res.send({
        "table-1652-79": {
            "title": [
                "Year",
                "Gold",
                "Silver",
                "Bronze"
            ],
            "numCols": 4,
            "numericColumns": [],
            "pgTitle": "FIS Freestyle World Ski Championships",
            "numDataRows": 5,
            "secondTitle": "Ski cross",
            "numHeaderRows": 1,
            "caption": "Ski cross",
            "data": [
                [
                    "2005 Ruka",
                    "Tomas Kraus",
                    "Jesper Brugge",
                    "Audun Groenvold"
                ],
                [
                    "2007 Madonna di Campiglio",
                    "Tomas Kraus",
                    "Stanley Hayer",
                    "Enak Gavaggio"
                ],
                [
                    "2009 Inawashiro",
                    "Andreas Matt",
                    "Thomas Zangerl",
                    "Davey Barr"
                ]
            ]
        },
        "table-1652-200": {
            "title": [
                "Chart (1986)",
                "Peak position"
            ],
            "numCols": 2,
            "numericColumns": [
                1
            ],
            "pgTitle": "Holiday Rap",
            "numDataRows": 9,
            "secondTitle": "Peak positions",
            "numHeaderRows": 1,
            "caption": "Peak positions",
            "data": [
                [
                    "Austrian Singles Chart",
                    "2"
                ],
                [
                    "Canadian Singles Chart",
                    "9"
                ],
                [
                    "Dutch Top 40",
                    "1"
                ],
                [
                    "French SNEP Singles Chart",
                    "1"
                ],
                [
                    "German Singles Chart",
                    "1"
                ],
                [
                    "Norwegian Singles Chart",
                    "3"
                ],
                [
                    "Swedish Singles Chart",
                    "7"
                ],
                [
                    "Swiss Singles Chart",
                    "1"
                ],
                [
                    "UK Singles Chart",
                    "6"
                ]
            ]
        }
    })
}

exports.getRandomLote = async (req, res) => {
    // function readFiles(dir, processFile) {
    //     // read directory
    //     fs.readdir(dir, (error, fileNames) => {
    //       if (error) throw error;

    //       fileNames.forEach(filename => {
    //         // get current file name
    //         const name = path.parse(filename).name;
    //         // get current file extension
    //         const ext = path.parse(filename).ext;
    //         // get current file path
    //         const filepath = path.resolve(dir, filename);

    //         // get information about the file
    //         fs.stat(filepath, function(error, stat) {
    //           if (error) throw error;

    //           // check if the current path is a file or a folder
    //           const isFile = stat.isFile();

    //           // exclude folders
    //           if (isFile) {
    //             // callback, do something with the file
    //             processFile(filepath, name, ext, stat);
    //           }
    //         });
    //       });
    //     });
    // }

    //   readFiles('C:/Users/Gabriel/Desktop/TFG/server/ficheros/lotes', (filepath, name, ext, stat) => {
    //     console.log('file path:', filepath);
    //     console.log('file name:', name);
    //     console.log('file extension:', ext);
    //     // console.log('file information:', stat);

    //     fs.readFile(filepath, 'utf8', (err, data) => {
    //         if (err) {
    //           console.error(err);
    //           return;
    //         }
    //         console.log(data);
    //     });
    //   });
    res.send(
        {
            "lote-1": {
                "query": "table-1234-345",
                "candidates": [
                    "table-0000-000",
                    "table-1652-200"
                ],
                "numCandidate": 2
            },
        })
}


exports.store = async (req,  res) => {

    console.log(req.body);
    console.log(req.body.tablas)
    console.log(req.body.completada)
    console.log(req.body.relaciones)
    console.log(req.body.tablas)


    const _newResult = new Resultado({
        email : req.body.email,
        completada : req.body.completada,
        motivo : req.body.motivo,
        tablas : req.body.tablas,
        relaciones: JSON.parse(JSON.stringify(req.body.relaciones)),
    })  

    console.log(_newResult);


    _newResult.save(_newResult)
    .then(data => {
        res.send("Tabla creada correctamente")
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "ERROR"
        });
    });
}



