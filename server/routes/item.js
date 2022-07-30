const express = require('express');
const router = express.Router();

const {getItems, postItems} = require('../controllers/item');

router.route("/get").get(getItems);
// router.route("/post").post(postItems);

module.exports = router;
