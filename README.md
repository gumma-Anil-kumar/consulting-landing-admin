# Consulting Landing Page – Full Stack Application

## 📌 Overview
This is a full-stack web application consisting of a public landing page and an admin panel.  
The landing page displays company projects and clients, allows users to submit a contact form, and subscribe to a newsletter.  
The admin panel allows management of all dynamic content through real CRUD operations.

---

## 🛠️ Tech Stack
### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- FastAPI
- MongoDB Atlas
- Pydantic
- Uvicorn

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ✨ Features

### 🔹 Landing Page
- View projects fetched from backend
- View happy clients fetched from backend
- Contact form submission
- Newsletter subscription

### 🔹 Admin Panel
- Dashboard with project, client, contact, and subscriber counts
- Manage projects (add, edit, delete, image upload, search)
- Manage clients (add, edit, delete, image upload, search)
- View and delete contact form submissions
- View and delete newsletter subscribers
- Filter contacts by name or mobile number
- Filter subscribers by email

---

## 🧭 How to Access Admin Panel
The admin panel is accessible via a dedicated route.

### 👉 Local:http://localhost:5173/admin

### 👉 After Deployment:
https://<frontend-domain>/admin 

> Authentication is intentionally not implemented for this assignment to focus on core CRUD functionality and system design.

---

## 📂 Project Structure

consulting-landing-admin/
│
├── frontend/
│ ├── src/
│ │ ├── admin/
│ │ ├── components/
│ │ ├── pages/
│ │ └── services/
│
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│
└── README.md

---

## ▶️ How to Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
http://127.0.0.1:8000
frontend
cd frontend
npm install
npm run dev
http://localhost:5173
