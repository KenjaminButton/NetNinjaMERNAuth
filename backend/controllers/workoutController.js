// Writing a bunch of functions that we can reference inside routes/workouts.js
const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getAllWorkouts = async (req, res) => {
  // FIND ALL
  // Sort by desc order
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// GET a single workout
const getSingleWorkout = async (req, res) => {
  // Grab the ID from the route parameter
  const {id} = req.params

  // Error handling to make app not CRASH and shit the bed if ID is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'NO SUCH WORKOUT'})
  }

  // console.log('this is the ID', id) 
  // res.status(200).json({"ken": "FUNNY"})
  const workout = await Workout.findById(id)
  
  // Do we have a workout? Error handling
  if (!workout) {
    res.status(404).json({error: 'No such workout'})
  }
  // workout found
  res.status(200).json(workout)
}

// POST/CREATE a new workout
const createWorkout = async (req, res) => {
  // Creating a NEW workout
  const {title, reps, load} = req.body

  // Error handling
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0 ) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  // Adding document to database
  try {
    const workout = await Workout.create({
      title,
      reps,
      load
    })
    res.status(200).json(workout)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
  // Grab the ID from the route parameter
  const {id} = req.params

  // Error handling to make app not CRASH and shit the bed if ID is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'NO SUCH WORKOUT'})
  }

  // In MongoDB, it's _id not id
  const workout = await Workout.findOneAndDelete({_id: id})

  // Do we have a workout? Error handling
  if (!workout) {
    res.status(404).json({error: "No such workout"})
  }
  
  // Sending the workout we just deleted
  res.status(200).json(workout)
}

// PATCH/UPDATE a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params

  // Error handling to make app not CRASH and shit the bed if ID is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'NO SUCH WORKOUT'})
  }

  // In MongoDB, it's _id not id
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  // Do we have a workout? Error handling
  if (!workout) {
    res.status(404).json({error: "No such workout"})
  }

  // Sending the workout we just updated
  res.status(200).json(workout)

}

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
}