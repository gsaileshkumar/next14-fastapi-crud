from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import time


todo_router = APIRouter()

class TodoItem(BaseModel):
    id: int
    title: str
    completed: bool
    
class TodoRequest(BaseModel):
    title: str

todos: List[TodoItem] = [TodoItem(id=123, title="hellooo", completed=False)]

@todo_router.get("/todos", response_model=List[TodoItem])
async def get_all_todos():
    return todos


@todo_router.post("/todos", response_model=TodoItem)
async def create_todo(newTodo: TodoRequest):
    print(newTodo)
    new_id = int(time.time())
    new_todo = TodoItem(id=new_id, title=newTodo.title, completed=False)
    todos.append(new_todo)
    return new_todo


@todo_router.put("/todos/{todo_id}", response_model=TodoItem)
async def update_todo(todo_id: int, updated_todo: TodoItem):
    todo_index = -1
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todo_index = index
            break
    
    if todo_index < 0:
        raise HTTPException(status_code=400, detail=f"Todo for update is not available: {todo_id}")
    
    todos[todo_index] = updated_todo
    return updated_todo



@todo_router.delete("/todos/{todo_id}", response_model=bool)
async def delete_todo(todo_id: int):
    todo_index = -1
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todo_index = index
            break
    
    if todo_index < 0:
        raise HTTPException(status_code=400, detail=f"Todo for delete is not available: {todo_id}")
    
    todos.pop(todo_index)
    return True

