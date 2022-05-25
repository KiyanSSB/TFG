const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb+srv://gdld1:123673Gdld%401@cluster0.hrwxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = db;
