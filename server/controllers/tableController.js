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

exports.tablas = async(req,res) => {
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