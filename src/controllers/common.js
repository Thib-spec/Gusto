/* FUNCTIONS */

module.exports = {
    list (req, res, Model) {
        Model
            .findAll()
            .then((entities) => res.status(200).json(entities))
            .catch((error) => res.status(400).json(error));
    }
};
