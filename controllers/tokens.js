const bcrypt = require('bcrypt-nodejs');
const ModelTokens = require('../models').Tokens;
const ModelClients = require('../models').Clients;
const ModelUsers = require('../models').Users;

exports.register = function (req, res) {
    const { username, password, fullName } = req.body;
    ModelUsers
        .create({
            username: username,
            password: password,
            fullName: fullName
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
};

module.exports.getAccessToken = function (bearerToken) {
    return ModelTokens.findOne(
        {
            where: {
                accessToken: bearerToken
            },
            include: [
                {
                    model: ModelClients,
                    as: 'client'
                },
                {
                    model: ModelUsers,
                    as: 'user'
                }
            ]
        })
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.client.get();
            data.user = data.user.get();
            return data;
        })
        .catch((error) => console.error(error));
};

module.exports.getClient = function (clientId, clientSecret) {
    return ModelClients.findOne({where: {clientId: clientId, clientSecret: clientSecret}, raw: true});
};

module.exports.getRefreshToken = function (refreshToken) {
    return ModelTokens.findOne(
        {
            where: {
                refreshToken: refreshToken
            },
            include: [
                {
                    model: ModelClients,
                    as: 'client'
                },
                {
                    model: ModelUsers,
                    as: 'user'
                }
            ]
        })
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.client.get();
            data.user = data.user.get();
            return data;
        })
        .catch((error) => console.error(error));
};

module.exports.getUser = function (username, password) {
    return ModelUsers.findOne({where: {username: username}})
        .then((user) => {
            const isMatch = bcrypt.compareSync(password, user.get().password);
            if (isMatch) {
                return user.get();
            } else {
                console.error("Password not match");
            }
        });
};

module.exports.saveToken = function (token, client, user) {
    return ModelTokens
        .create(
            {
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                clientId: client.id,
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                userId: user.id
            }
        )
        .then((token) => {
            const data = new Object();
            for (const prop in token.get()) data[prop] = token[prop];
            data.client = data.clientId;
            data.user = data.userId;

            return data;
        })
        .catch((error) => console.error(error));
};

module.exports.revokeToken = function (token) {
    console.log("Revoke token");
    return ModelTokens
        .findOne({where: {refreshToken: token.refreshToken}})
        .then(refreshToken => {
            console.log(refreshToken);
            return refreshToken
                .destroy()
                .then(() => {
                    return !!refreshToken
                })
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
};