"use client";

import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useState } from "react";

export type TodoItem = {
    id: number
    title: string
    completed: boolean
}

type TodoItemProps = {
  todo: TodoItem
  onDelete: (id: number) => void
  onUpdate: (id:number, updatedTodo: TodoItem) => void
}

export default function TodoItem(props: TodoItemProps) {
  const {todo, onDelete, onUpdate} = props
  const {id, title, completed} = todo

  const [isEditing, setIsEditing] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(title)

  const onDoubleClickHandler: MouseEventHandler<HTMLDivElement> = () => {
    console.log("clicked")
    setIsEditing(true)
  }

  const onKeyUpHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if( e.key === "Enter"){
      const updatedTodo = {
        ...todo,
        title: updatedTitle
      }

      onUpdate(id, updatedTodo)
      setIsEditing(false)

    }
    return
  }

  const onStatusChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
      const updatedTodo = {
        ...todo,
        completed: !completed
      }
      onUpdate(id, updatedTodo)

    return
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTitle(e.target.value)
  }

  return (
        <div style={{display:"flex", gap:"1rem"}}>
          <input type="checkbox" checked={completed} onChange={onStatusChangeHandler}/>
          {
            isEditing ? <input type="text" value={updatedTitle} onKeyUp={onKeyUpHandler} onChange={onChangeHandler}/>
            : <div style={{textDecoration: completed ? "line-through": "none"}} 
                onDoubleClick={onDoubleClickHandler}
              >{title}</div>
          }
          <button onClick={()=> onDelete(id)}>Delete</button>
        </div>
  );
}
