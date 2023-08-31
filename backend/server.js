require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Express app
const app = express()
// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

// Global Middleware
app.use(express.json()) // attaches to the req object (e.g. req.body)
app.use( (req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
// localhost:4000/api/workouts
app.use('/api/workouts', workoutRoutes)

// Connect to database
mongoose.connect(process.env.ATLAS_URI)
  .then( () => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to MongoDB Atlas DB & listening on port 4000 on a Friday')
    })
  })
  .catch( (error) => {
    console.log(error)
  })




