const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const db = require("./config/database");
const cors = require("cors");
const express = require('express')
const app = express()
const routes = require('./routes/routes');
const functions = require('firebase-functions')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


db.mongoose.connect(db.url,{})
.then(() => {   
    console.log("Connected to the database!");})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(routes);

exports.app = functions.https.onRequest(app);