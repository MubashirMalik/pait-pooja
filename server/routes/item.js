const express = require('express');
const router = express.Router();

const {getItems} = require('../controllers/item');

router.route("/get").get(getItems);

module.exports = router;
