const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8081

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.static('public'))
app.use(cors())
const db = require('./models')
// NOTE: force for develop is true, for production is false
db.sequelize.sync({ force: false }).then(() => {
  console.log('Sync Database => Success')
}).catch((error) => {
  console.log('Sync Database => ', error)
})

require('./routes/auth.routes')(app)
require('./routes/district.routes')(app)
require('./routes/public.routes')(app)

const authService = require('./services/authorization')
app.all('*', authService.verifyMidleware)

require('./routes/profile.routes')(app)
require('./routes/product.routes')(app)
require('./routes/category.routes')(app)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
