const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

const yaml = require('js-yaml');
const fs = require('fs');
const swaggerDocument = yaml.load(fs.readFileSync(__dirname + '/swagger.yml', 'utf8'));

const options = {
    explorer: true
};

// router
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = router