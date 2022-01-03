/* ----------------------------------- */
/* L'ensemble des fichiers dans "routes" sont construits de la même manière  où selon le type de requête on vient spécifier l'url de la requête ainsi que la fonction à appliquer*/
/* ----------------------------------- */

const badges = require('express').Router();
const badgeController = require("../controllers/badges")


badges.get('/',badgeController.listBadges)
badges.get('/:id', badgeController.getBadgeById)

badges.post('/',badgeController.addBadge)
badges.put('/:id',badgeController.editBadge)
badges.delete('/:id',badgeController.deleteBadge)


module.exports = badges
