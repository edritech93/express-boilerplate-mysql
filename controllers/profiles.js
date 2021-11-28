const ModelUsers = require('../models').Users;

exports.getProfiles = function (req, res) {
    const {user} = res.locals.oauth.token
    ModelUsers.findOne({where: {id: user.id}})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
};
