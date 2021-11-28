const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080;

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors())

const controllerTokens = require('./controllers/tokens');
const OAuthServer = require('express-oauth-server');
app.oauth = new OAuthServer({
  model: controllerTokens,
});

const routeClients = require('./routes/clients')
const routeTokens = require('./routes/tokens')
const routeProfiles = require('./routes/profiles')
routeClients(app);
routeTokens(app);
routeProfiles(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})