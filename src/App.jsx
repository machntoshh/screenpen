import { use, useEffect, useState } from 'react'
import './App.css'
import supabase from './supabase-client'

function App() {

  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchTodos();
  }, [])
  

  // Pegando os Todos já criados do supabase
  const fetchTodos = async () => {
    // desestructuring supabase client response
    const { data, error } = await supabase.from("TodoList").select("*") // vai pegar td da table do superbase
    
    if (error) {
      console.log("Error fetching todos: ", error);
    } else {
      setTodoList(data)
    }
  }


  // Adicionando um novo item no Todo da supabase
    const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };


  // Completar task da todolist
  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase
    .from("TodoList")
    .update({isCompleted: !isCompleted})
    .eq("id", id)

    if (error) {
      console.log("Error toggling task: ", error)
    } else {
      const updatedTodoList = todoList.map((todo) => todo.id === id ? {...todo, isCompleted: !isCompleted} : todo)
      setTodoList(updatedTodoList);
    }
  }


  // Deletar task da todolist
  const deleteTask = async (id) => {
    const { data, error } = await supabase
    .from("TodoList")
    .delete()
    .eq("id", id)

    if (error) {
      console.log("Error deleting task: ", error)
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  }
  //----------------------------------------------------------------------------

  return (
    <div>
      {" "}
      <h1>Screenpen</h1>
      <div>
        <input 
        type="text" 
        placeholder="What i'm going to do?"
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)}/>
        <button onClick={addTodo}>Add item</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li>
            <p>{todo.name}</p>
            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>
            {""}
            {todo.isCompleted ? "Undo" : "Complete"}</button>
            <button onClick={() => deleteTask(todo.id)}>Delete task</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
