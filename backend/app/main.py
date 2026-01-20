from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from .routers import notes

app = FastAPI(
    title="API Notes",
    description="API for creating, editing, and deleting notes",
    version="1.0.0"
)

# ROUTER
app.include_router(notes.router)
#MIDELWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)