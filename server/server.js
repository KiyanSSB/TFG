const db = require("./config/database");
const cors = require("cors");
const express = require('express')
const app = express()
const routes = require('./routes/routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: '*'
}));


db.mongoose.connect(db.url,{})
.then(() => {   
    console.log("Connected to the database!");})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(routes);
app.listen(process.env.PORT || port , () => console.log('Example app listening at http://localhost:${port}'));
