const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8080;

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors())
const db = require("./models");
db.sequelize.sync();

require("./routes/turorial.routes")(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})