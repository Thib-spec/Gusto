const badges = require('express').Router();
const badgeController = require("../controllers/badges")
const passport = require("passport")

badges.get('/',badgeController.listBadges)
badges.get('/:id', badgeController.getBadgeById)

badges.post('/',badgeController.addBadge)
badges.put('/:id',badgeController.editBadge)
badges.delete('/:id',badgeController.deleteBadge)


module.exports = badges
