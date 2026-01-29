from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from bson import ObjectId
import shutil
import os

from database import (
    projects_collection,
    clients_collection,
    contacts_collection,
    newsletter_collection
)

from models import (
    ClientCreate,
    ContactCreate,
    NewsletterCreate
)

# --------------------------------------------------
# APP SETUP
# --------------------------------------------------

app = FastAPI(title="Consulting Landing Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# STATIC FILES (IMAGES)
# --------------------------------------------------

UPLOAD_PROJECTS_DIR = "uploads/projects"
UPLOAD_CLIENTS_DIR = "uploads/clients"

os.makedirs(UPLOAD_PROJECTS_DIR, exist_ok=True)
os.makedirs(UPLOAD_CLIENTS_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():
    return {"message": "Backend running 🚀"}

# --------------------------------------------------
# PROJECT APIs (CRUD + IMAGE)
# --------------------------------------------------

# CREATE PROJECT
@app.post("/projects")
def add_project(
    name: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):
    file_path = f"{UPLOAD_PROJECTS_DIR}/{image.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    project = {
        "name": name,
        "description": description,
        "image": file_path
    }

    projects_collection.insert_one(project)
    return {"message": "Project added successfully"}

# GET PROJECTS (USED BY LANDING + ADMIN)
@app.get("/projects")
def get_projects():
    projects = []
    for p in projects_collection.find():
        p["_id"] = str(p["_id"])
        projects.append(p)
    return projects

# UPDATE PROJECT
@app.put("/projects/{project_id}")
def update_project(
    project_id: str,
    name: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None)
):
    update_data = {
        "name": name,
        "description": description
    }

    if image:
        file_path = f"{UPLOAD_PROJECTS_DIR}/{image.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        update_data["image"] = file_path

    projects_collection.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )

    return {"message": "Project updated successfully"}
@app.put("/clients/{client_id}")
def update_client(
    client_id: str,
    name: str = Form(...),
    designation: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None)
):
    update_data = {
        "name": name,
        "designation": designation,
        "description": description
    }

    if image:
        file_path = f"{UPLOAD_CLIENTS_DIR}/{image.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        update_data["image"] = file_path

    clients_collection.update_one(
        {"_id": ObjectId(client_id)},
        {"$set": update_data}
    )

    return {"message": "Client updated successfully"}

# DELETE PROJECT
@app.delete("/clients/{client_id}")
def delete_client(client_id: str):
    clients_collection.delete_one({"_id": ObjectId(client_id)})
    return {"message": "Client deleted successfully"}


# --------------------------------------------------
# CLIENT APIs
# --------------------------------------------------

@app.post("/clients")
def add_client(
    name: str = Form(...),
    designation: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):
    file_path = f"{UPLOAD_CLIENTS_DIR}/{image.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    client = {
        "name": name,
        "designation": designation,
        "description": description,
        "image": file_path
    }

    clients_collection.insert_one(client)
    return {"message": "Client added successfully"}


@app.get("/clients")
def get_clients():
    clients = []
    for c in clients_collection.find():
        c["_id"] = str(c["_id"])
        clients.append(c)
    return clients


# --------------------------------------------------
# CONTACT FORM APIs
# --------------------------------------------------
@app.delete("/contact/{contact_id}")
def delete_contact(contact_id: str):
    contacts_collection.delete_one({"_id": ObjectId(contact_id)})
    return {"message": "Contact deleted successfully"}

@app.post("/contact")
def submit_contact(contact: ContactCreate):
    contacts_collection.insert_one(contact.dict())
    return {"message": "Contact form submitted"}

@app.get("/contact")
def get_contacts():
    contacts = []
    for c in contacts_collection.find():
        c["_id"] = str(c["_id"])
        contacts.append(c)
    return contacts

# --------------------------------------------------
# NEWSLETTER APIs
# --------------------------------------------------
@app.delete("/subscribe/{subscriber_id}")
def delete_subscriber(subscriber_id: str):
    newsletter_collection.delete_one({"_id": ObjectId(subscriber_id)})
    return {"message": "Subscriber deleted successfully"}

@app.post("/subscribe")
def subscribe(newsletter: NewsletterCreate):
    newsletter_collection.insert_one(newsletter.dict())
    return {"message": "Subscribed successfully"}

@app.get("/subscribe")
def get_subscribers():
    subscribers = []
    for s in newsletter_collection.find():
        s["_id"] = str(s["_id"])
        subscribers.append(s)
    return subscribers
@app.get("/admin/stats")
def admin_stats():
    return {
        "projects": projects_collection.count_documents({}),
        "clients": clients_collection.count_documents({}),
        "contacts": contacts_collection.count_documents({}),
        "subscribers": newsletter_collection.count_documents({})
    }
