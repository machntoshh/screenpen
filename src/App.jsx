import { use, useState } from 'react'
import './App.css'
import supabase from './supabase-client'

function App() {

  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    }
    const { data, error } = await supabase.from("todolist").insert([newTodoData]).single()

    if (error) {
      console.log("Error adding todo: ", error)
    } else {
      setTodoList((prev) => [...prev, data])
      setNewTodo("")
    }
  }

  return (
    <div>
      <h1>Screenpen</h1>
      <div>
        <input type="text" placeholder="What i'm going to do?" onChange={(e) => setNewTodo(e.target.value)}/>
        <button>Add item</button>
      </div>

      <ul></ul>
    </div>
  )
}

export default App
