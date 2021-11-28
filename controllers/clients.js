const ModelClients = require('../models').Clients;

exports.getClients = function (req, res) {
    ModelClients.findAll({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
};

exports.addClients = function (req, res) {
    const { clientId, clientSecret, redirectUris, grants } = req.body;
    ModelClients
        .create({
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUris: redirectUris,
            grants: grants,
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
};