const mongoose = require('mongoose')

const mongoURI =
  'mongodb+srv://omkar-ghodake:Omkar%401831%24@cluster0.w5b4a.mongodb.net/SecurityBoatAssignment?retryWrites=true&w=majority'

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log('Connected to Mongo Successfully')
  })
}

module.exports = connectToMongo
