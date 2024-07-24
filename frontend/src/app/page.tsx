"use client";

import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import TodoItem, { type TodoItem as  Todotype } from "./TodoItem";
import todoService from "./TodoService";

export default function Home() {

  const [newTitle, setNewTitle] = useState("")
  const [todos, setTodos] = useState<Todotype[]>([])

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTitle(e.target.value)
  }

  const createTodo = async () => {
    const res = await todoService.createTodo(newTitle)
    setTodos([...todos, res])
  }

  const onKeyUpHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if( e.key === "Enter"){
      createTodo()
    }
    return
  }

  const getTodos = async () => {
    const res = await todoService.getTodos()
    setTodos(res)
  }

  useEffect(()=>{
    getTodos()
  }, [])

  const onUpdateHandler = async (id: number, updatedTodo: Todotype) => {

    const todoIndex = todos.findIndex(todo => todo.id === id)

    if(todoIndex > -1){
      const res = await todoService.updateTodo(id, updatedTodo)

      const todosClone = Array.from(todos)
      todosClone[todoIndex] = res

      setTodos(todosClone)
    }

  }

  const onDeleteHandler = async (id: number) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if(todoIndex > -1){
      const res = await todoService.deleteTodo(id)

      if(res){
        const updatedTodos = todos.filter(todo => todo.id !== id)
        setTodos(updatedTodos)
      }

    }

  }

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"2rem"}}>
      <div style={{display: "flex", flexDirection:"column", width:500, gap:"0.5rem"}}>
      <h3>todos</h3>
      <input type="text" value={newTitle} onChange={onChangeHandler} onKeyUp={onKeyUpHandler}/>
      
      <ul>
        {
          todos.map(todo => <TodoItem key={todo.id} todo={todo} onUpdate={onUpdateHandler} onDelete={onDeleteHandler}/>)
        }
      </ul>
    </div>
    </div>
  );
}
