const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo()
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(
    `App listening at https://your-notebook-backend.vercel.app:${port}`
  )
})

// Your code
if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.resolve(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html'),
      function (err) {
        if (err) {
          res.status(500).send(err)
        }
      }
    )
  })
}
// Your code
