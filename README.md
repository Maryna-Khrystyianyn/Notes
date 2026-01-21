

# Notes App 📝
https://notes-olive-six-21.vercel.app/

This is my first web application with a full Python backend.
The project allows you to create, view, edit, and delete notes via a web interface.

---

## 🚀 Functionality

- Creating notes
- Viewing the list of notes
- Detailed view of each note in a modal window
- Editing and saving notes
- Deleting notes
- Dark purple theme for comfortable use

---

## 🛠 Technologies

### Backend
- **Python 3.12**
- **FastAPI** – web framework for creating APIs
- **SQLAlchemy** – ORM for working with the database
- **SQLite** – local database
- **Uvicorn** – ASGI server for running FastAPI

### Frontend
- **Next.js 13** – modern React framework
- **TypeScript** – static typing for React
- **TailwindCSS** – for rapid style development
- **GSAP** – text and modal window animations

---

## ⚡ Project architecture
project-root/
│
├─ backend/ # FastAPI backend
│ ├─ app/
│ │ ├─ main.py # Основний файл FastAPI
│ │ ├─ models.py # Моделі SQLAlchemy
│ │ ├─ schemas.py # Pydantic схеми
│ │ └─ routers/
│ │ └─ notes.py # Ендпоінти для нотаток
│ └─ venv/ # Віртуальне середовище
│
├─ frontend/ # Next.js frontend
│ ├─ app/
│ │ ├─ page.tsx # Головна сторінка
│ │ ├─ components/ # Компоненти: NotesList, NoteModal, RollingTitle
│ │ └─ types/ # Типи TypeScript
│ └─ package.json
└─ README.md

## 🌐 Deployment

- **Backend:** Render (https://notes-ja7f.onrender.com)
- **Frontend:** Vercel (insert your URL here after deployment)

**CORS** is configured to connect the frontend and backend.

---

## 💡 My experience

This is my **first project with a backend in Python**.
During the implementation, I learned:

- create a REST API on FastAPI
- work with a database via SQLAlchemy
- integrate the frontend on Next.js with the backend
- make animations and modal windows via GSAP

---

## 🔧 Local launch

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```