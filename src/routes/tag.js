const tags = require('express').Router();
const tagController = require("../controllers/tag")
const passport = require("passport")

tags.get('/',tagController.listTags)
tags.get('/:id', tagController.getTagById)

tags.post('/',tagController.addTag)
tags.put('/:id',tagController.editTag)



module.exports = tags