import { useState } from 'react'

import './App.css'
import TaskManager from './components/TaskManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TaskManager/>
    </>
  )
}

export default App
