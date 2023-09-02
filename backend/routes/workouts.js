const express = require('express')
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')
const Workout = require('../models/WorkoutModel')


const router = express.Router()

// Require Auth for all routes
router.use(requireAuth)

// GET all workouts
// localhost:4000/api/workouts/
router.get('/', getAllWorkouts)

// POST a new workout
// localhost:4000/api/workouts/
router.post('/', createWorkout)

// GET a single workout
// localhost:4000/api/workouts/:id
router.get('/:id', getSingleWorkout)

// DELETE a single workout
// localhost:4000/api/workouts/:id
router.delete('/:id', deleteWorkout)

// PATCH a single workout
// localhost:4000/api/workouts/:id
router.patch('/:id', updateWorkout)

// localhost:4000/api/workouts/hello
router.get('/hello', (req, res) => {
  res.json({msg: 'Hello genius!'})
})

module.exports = router