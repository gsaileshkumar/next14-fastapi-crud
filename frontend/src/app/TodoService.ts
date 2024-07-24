import { type TodoItem } from "./TodoItem"

class TodoService {

    public getTodos = async () => {
      const res = await fetch("http://localhost:8002/todos")
      const resJson = await res.json()
      return resJson
    }

    public createTodo = async (newTitle: string) => {
        const res = await fetch("http://localhost:8002/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title:newTitle})
          })
      
          return await res.json() as TodoItem
    }

    public updateTodo = async (id: number, updatedTodo: TodoItem) => {
          const res = await fetch(`http://localhost:8002/todos/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodo)
          })
      
          return await res.json()
      }

      public deleteTodo = async (id: number) => {
        const res = await fetch(`http://localhost:8002/todos/${id}`, {
          method: "DELETE",
        })
    
        return await res.json()
  
    } 

}

const todoService = new TodoService()
export default todoService