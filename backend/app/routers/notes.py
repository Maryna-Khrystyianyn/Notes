from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(
    prefix="/notes",            
    tags=["Notes"],             
    responses={404: {"description": "Not found"}}
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET /notes/
@router.get("/", response_model=List[schemas.NoteOut], summary="List of notes", description="Get all notes")
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()

# POST /notes/
@router.post("/", response_model=schemas.NoteOut, summary="Create note", description="Creates a new note")
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

# GET /notes/{id}
@router.get("/{note_id}", response_model=schemas.NoteOut, summary="specific note", description="Get a specific note by ID")
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# PUT /notes/{id}
@router.put("/{note_id}", response_model=schemas.NoteOut, summary="Update specific note", description="Update specific note by ID")
def update_note(note_id: int, note_update: schemas.NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    note.title = note_update.title
    note.content = note_update.content
    db.commit()
    db.refresh(note)
    return note

# DELETE /notes/{id}
@router.delete("/{note_id}", summary="Delete specific note", description="Delete specific note by ID")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"detail": "Note deleted"}
