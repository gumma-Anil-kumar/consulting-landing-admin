from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
import shutil
import os

from database import (
    projects_collection,
    clients_collection,
    contacts_collection,
    newsletter_collection
)
from models import (
    ProjectCreate,
    ClientCreate,
    ContactCreate,
    NewsletterCreate
)

app = FastAPI(title="Consulting Landing Backend")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running 🚀"}

# ---------------- PROJECT APIs ----------------

@app.post("/projects")
def add_project(project: ProjectCreate):
    projects_collection.insert_one(project.dict())
    return {"message": "Project added successfully"}

@app.get("/projects")
def get_projects():
    projects = list(projects_collection.find({}, {"_id": 0}))
    return projects


# ---------------- CLIENT APIs ----------------

@app.post("/clients")
def add_client(client: ClientCreate):
    clients_collection.insert_one(client.dict())
    return {"message": "Client added successfully"}

@app.get("/clients")
def get_clients():
    clients = list(clients_collection.find({}, {"_id": 0}))
    return clients


# ---------------- CONTACT FORM ----------------

@app.post("/contact")
def submit_contact(contact: ContactCreate):
    contacts_collection.insert_one(contact.dict())
    return {"message": "Contact form submitted"}

@app.get("/contact")
def get_contacts():
    contacts = list(contacts_collection.find({}, {"_id": 0}))
    return contacts


# ---------------- NEWSLETTER ----------------

@app.post("/subscribe")
def subscribe(newsletter: NewsletterCreate):
    newsletter_collection.insert_one(newsletter.dict())
    return {"message": "Subscribed successfully"}

@app.get("/subscribe")
def get_subscribers():
    subscribers = list(newsletter_collection.find({}, {"_id": 0}))
    return subscribers
@app.post("/upload/project-image")
def upload_project_image(file: UploadFile = File(...)):
    upload_dir = "uploads/projects"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Project image uploaded successfully",
        "image_url": file_path
    }
@app.post("/upload/client-image")
def upload_client_image(file: UploadFile = File(...)):
    upload_dir = "uploads/clients"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Client image uploaded successfully",
        "image_url": file_path
    }
