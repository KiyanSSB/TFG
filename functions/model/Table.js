var mongoose = require('mongoose')

var Table = new mongoose.Schema({
    Tabla: Object
})

module.exports = mongoose.model('Table' , Table);