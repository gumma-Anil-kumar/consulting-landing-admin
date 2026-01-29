from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)
db = client["consultingDB"]

# Collections
projects_collection = db["projects"]
clients_collection = db["clients"]
contacts_collection = db["contacts"]
newsletter_collection = db["newsletter"]
