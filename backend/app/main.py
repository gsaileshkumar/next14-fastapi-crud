from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.todos import todo_router

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods = ["*"])

@app.get("/")
def hello_world():
    return {"hello": "world"}


app.include_router(todo_router)