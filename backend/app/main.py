from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/hello")
def hello(name: str = "World"):
    return {"greeting": f"Hello, {name}!"}