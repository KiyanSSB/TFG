const express = require('express');
const router = express.Router();
const tableController = require("../controllers/tableController");

router.get("/",tableController.hello)
// router.get("/id" , tableController.get);
router.post("/newTable" , tableController.newTable);
router.post("/newTableResult" , tableController.newTableResult);
router.post("/newTableArray" , tableController.newTableArray);
router.get("/random" , tableController.getRandomTable);
router.get("/tablas"  , tableController.tablas );

module.exports = router;