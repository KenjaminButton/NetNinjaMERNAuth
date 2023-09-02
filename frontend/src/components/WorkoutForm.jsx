// WorkoutForm.jsx
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const [title, setTitle] = useState('') 
  const [reps, setReps] = useState('') 
  const [load, setLoad] = useState('')
  const [error, setError] = useState(null)

  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    // Creating a dummy workout object that we're gonna send as the body of the request
    const workout = {title, load, reps}
    console.log('workout', workout)

    // Using the FETCH API to send a POST request
    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/JSON',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setError(null)
      console.log('new workout added', json)
      // RESET the FORM
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      dispatch( {type: 'CREATE_WORKOUT', payload: json} )
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title</label>
      <input
        type="text" 
        placeholder="E.G. Video Games"
        onChange={ (evt) => setTitle(evt.target.value)}
        // Two-way binding approach
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Exercise Reps</label>
      <input
        type="number" 
        placeholder="E.G. 3"
        onChange={ (evt) => setReps(evt.target.value)}
        // Two-way binding approach
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>Exercise Load</label>
      <input
        type="number" 
        placeholder="E.G. 35"
        onChange={ (evt) => setLoad(evt.target.value)}
        // Two-way binding approach
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm

