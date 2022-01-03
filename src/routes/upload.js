const upload = require('express').Router();
const uploadController = require("../controllers/upload")


upload.post('/',uploadController.upload)

module.exports = upload