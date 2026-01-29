from database import projects_collection, clients_collection

# -------- SAMPLE PROJECTS --------
projects = [
    {
        "name": "Real Estate Consulting",
        "description": "Professional real estate consulting services for buyers and sellers.",
        "image": "uploads/projects/project1.jpg"
    },
    {
        "name": "Home Design Planning",
        "description": "Modern architectural and interior design planning.",
        "image": "uploads/projects/project2.jpg"
    },
    {
        "name": "Marketing & Sales Strategy",
        "description": "Helping real estate businesses grow with smart marketing.",
        "image": "uploads/projects/project3.jpg"
    }
]

# -------- SAMPLE CLIENTS --------
clients = [
    {
        "name": "Rohan Smith",
        "description": "Very professional service and excellent guidance.",
        "designation": "CEO",
        "image": "uploads/clients/client1.jpg"
    },
    {
        "name": "Shipra Kayak",
        "description": "Amazing experience, highly recommended.",
        "designation": "Brand Designer",
        "image": "uploads/clients/client2.jpg"
    },
    {
        "name": "John Lepore",
        "description": "They helped us close deals faster.",
        "designation": "Marketing Head",
        "image": "uploads/clients/client3.jpg"
    }
]

def seed_database():
    if projects_collection.count_documents({}) == 0:
        projects_collection.insert_many(projects)
        print("✅ Sample projects inserted")
    else:
        print("⚠️ Projects already exist, skipping")

    if clients_collection.count_documents({}) == 0:
        clients_collection.insert_many(clients)
        print("✅ Sample clients inserted")
    else:
        print("⚠️ Clients already exist, skipping")

if __name__ == "__main__":
    seed_database()
