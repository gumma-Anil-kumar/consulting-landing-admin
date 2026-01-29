from pydantic import BaseModel, EmailStr
from typing import Optional

# ---------- Project ----------
class ProjectCreate(BaseModel):
    name: str
    description: str
    image: str   # image URL or path


# ---------- Client ----------
class ClientCreate(BaseModel):
    name: str
    description: str
    designation: str
    image: str   # image URL or path


# ---------- Contact Form ----------
class ContactCreate(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    city: str


# ---------- Newsletter ----------
class NewsletterCreate(BaseModel):
    email: EmailStr
