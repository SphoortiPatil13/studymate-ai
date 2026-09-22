from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, UploadFile, File , Form , HTTPException , Header
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import os
from pypdf import PdfReader
from database import get_connection
from fastapi.staticfiles import StaticFiles
from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
password_hash = PasswordHash.recommended()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
app = FastAPI()
app.mount("/uploads", 
          StaticFiles(directory="uploads"), 
          name="uploads")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://studymate-mqcrmc1qv-patilsphoorti13-8631.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "StudyMate AI Backend is running!"}

class MessageCreate(BaseModel):
    sender: str
    message: str

class Question(BaseModel):
    question: str

class NoteQuestion(BaseModel):
    question: str
    note_text: str

class Subject(BaseModel):
    title: str

class RenameNote(BaseModel):
    file_name: str

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ChatCreate(BaseModel):
    subject_id: int
    title: str

@app.get("/test-db")
def test_database():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT DATABASE()")
    database_name = cursor.fetchone()

    cursor.close()
    connection.close()

    return {
        "message": "Database connected successfully!",
        "database": database_name[0]
    }

security = HTTPBearer()
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        token = credentials.credentials

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired"
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

@app.get("/subjects")
def get_subjects(current_user=Depends(get_current_user)):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT * FROM subjects
        WHERE user_id = %s
        ORDER BY id
        """,
        (current_user["user_id"],)
    )

    subjects = cursor.fetchall()

    cursor.close()
    connection.close()

    return subjects

@app.get("/subjects/{subject_id}/notes")
def get_notes(
    subject_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check whether this subject belongs to the logged-in user
    cursor.execute(
        """
        SELECT id
        FROM subjects
        WHERE id = %s AND user_id = %s
        """,
        (subject_id, current_user["user_id"])
    )

    subject = cursor.fetchone()

    if not subject:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this subject"
        )

    # Get notes only after ownership is verified
    query = """
        SELECT id, file_name, file_type, file_path,
               extracted_text, uploaded_at
        FROM notes
        WHERE subject_id = %s
        ORDER BY id
    """

    cursor.execute(query, (subject_id,))
    notes = cursor.fetchall()

    cursor.close()
    connection.close()

    return notes

@app.get("/chats/{chat_id}/messages")
def get_messages(
    chat_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check chat ownership
    cursor.execute(
        """
        SELECT id
        FROM chats
        WHERE id = %s AND user_id = %s
        """,
        (chat_id, current_user["user_id"])
    )

    chat = cursor.fetchone()

    if not chat:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this chat"
        )

    cursor.execute(
        """
        SELECT id, chat_id, sender, message, created_at
        FROM messages
        WHERE chat_id = %s
        ORDER BY id ASC
        """,
        (chat_id,)
    )

    messages = cursor.fetchall()

    cursor.close()
    connection.close()

    return messages

@app.get("/subjects/{subject_id}/chats")
def get_chats(
    subject_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Only get chats belonging to this user and subject
    cursor.execute(
        """
        SELECT id, title, created_at, updated_at
        FROM chats
        WHERE subject_id = %s
        AND user_id = %s
        ORDER BY updated_at DESC
        """,
        (subject_id, current_user["user_id"])
    )

    chats = cursor.fetchall()

    cursor.close()
    connection.close()

    return chats

@app.post("/ask")
def ask_question(data: Question , current_user=Depends(get_current_user)):
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=data.question
    )
    return {
        "answer": response.text
    }

@app.post("/chats/{chat_id}/messages")
def create_message(
    chat_id: int,
    data: MessageCreate,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check that the chat belongs to the logged-in user
    cursor.execute(
        """
        SELECT id
        FROM chats
        WHERE id = %s AND user_id = %s
        """,
        (chat_id, current_user["user_id"])
    )

    chat = cursor.fetchone()

    if not chat:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this chat"
        )

    # Save message
    cursor.execute(
        """
        INSERT INTO messages (chat_id, sender, message)
        VALUES (%s, %s, %s)
        """,
        (
            chat_id,
            data.sender,
            data.message
        )
    )

    # Update chat's last activity
    cursor.execute(
        """
        UPDATE chats
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        """,
        (chat_id,)
    )

    connection.commit()

    message_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "id": message_id,
        "chat_id": chat_id,
        "sender": data.sender,
        "message": data.message
    }

@app.post("/login")
def login(user: UserLogin):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Find user using email
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (user.email,)
    )

    existing_user = cursor.fetchone()

    cursor.close()
    connection.close()

    # Check if user exists
    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    if not password_hash.verify(
        user.password,
        existing_user["hashed_password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT token
    payload = {
        "user_id": existing_user["id"],
        "email": existing_user["email"],
        "exp": datetime.utcnow() + timedelta(hours=24)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "user": {
            "id": existing_user["id"],
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }

@app.post("/chats")
def create_chat(
    data: ChatCreate,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor()

    # Make sure the subject belongs to the logged-in user
    cursor.execute(
        """
        SELECT id
        FROM subjects
        WHERE id = %s AND user_id = %s
        """,
        (data.subject_id, current_user["user_id"])
    )

    subject = cursor.fetchone()

    if not subject:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this subject"
        )

    cursor.execute(
        """
        INSERT INTO chats (user_id, subject_id, title)
        VALUES (%s, %s, %s)
        """,
        (
            current_user["user_id"],
            data.subject_id,
            data.title
        )
    )

    connection.commit()

    chat_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "id": chat_id,
        "title": data.title,
        "subject_id": data.subject_id
    }

@app.post("/ask-from-notes")
def ask_from_notes(
                   data: NoteQuestion,
                   current_user=Depends(get_current_user)):

    prompt = f"""
You are StudyMate AI, a helpful study assistant.

The student has uploaded study notes. Your job is to answer the student's
question while clearly distinguishing between information found in the notes
and your general knowledge.

Follow these rules:

1. Carefully examine the uploaded notes before answering.

2. If the answer is directly or clearly supported by the uploaded notes:
   - Answer using the information from the notes.
   - You may explain or simplify the information for the student.
   - Start the response with:
     "📚 From your notes:"

3. If the answer cannot be found or supported by the uploaded notes:
   - Answer using your general knowledge.
   - Do NOT claim or imply that the information came from the notes.
   - Start the response with:
     "🌐 From general knowledge:"

4. If the question is unrelated to the subject or notes, you may still answer
   it using general knowledge.

5. Never fabricate information and never invent information that is supposedly
   present in the notes.

6. Keep the answer clear, concise, and useful for a student.

7. Use Markdown formatting when appropriate, such as:
   - headings
   - bullet points
   - numbered lists
   - bold text
   - examples

Uploaded study notes:
====================
{data.note_text}
====================

Student's question:
====================
{data.question}
====================
"""
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return {
        "answer": response.text
    }

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    contents = await file.read()

    with open(f"uploads/{file.filename}", "wb") as f:
        f.write(contents)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename
    }

@app.post("/extract")
async def extract_pdf(
    file: UploadFile = File(...),
    subject_id: int = Form(...)
):
    contents = await file.read()

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(contents)
    print("PDF filename:", file.filename)
    print("PDF size:", len(contents))
    print("Saved file size:", os.path.getsize(file_path))
    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO notes
        (subject_id, file_name, file_type, file_path, extracted_text)
        VALUES (%s, %s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            subject_id,
            file.filename,
            file.content_type,
            file_path,
            text
        )
    )

    connection.commit()

    note_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "id": note_id,
        "filename": file.filename,
        "text": text
    }

@app.post("/subjects")
def create_subject(data: Subject, current_user=Depends(get_current_user)):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO subjects (title, user_id)
        VALUES (%s, %s)
    """

    cursor.execute(
        query,
        (
            data.title,
            current_user["user_id"]
        )
    )

    connection.commit()

    subject_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "id": subject_id,
        "title": data.title
    }

@app.post("/signup")
def signup(user: UserSignup):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check if email already exists
    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (user.email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = password_hash.hash(user.password)

    # Save user in database
    cursor.execute(
        """
        INSERT INTO users (name, email, hashed_password)
        VALUES (%s, %s, %s)
        """,
        (
            user.name,
            user.email,
            hashed_password
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "User created successfully"
    }

@app.put("/notes/{note_id}")
def rename_note(
    note_id: int,
    data: RenameNote,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check that the note belongs to the logged-in user
    cursor.execute(
        """
        SELECT notes.id
        FROM notes
        JOIN subjects ON notes.subject_id = subjects.id
        WHERE notes.id = %s
        AND subjects.user_id = %s
        """,
        (note_id, current_user["user_id"])
    )

    note = cursor.fetchone()

    if not note:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this note"
        )

    # Rename the note
    cursor.execute(
        """
        UPDATE notes
        SET file_name = %s
        WHERE id = %s
        """,
        (data.file_name, note_id)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Note renamed successfully",
        "file_name": data.file_name
    }

@app.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check that the note belongs to the logged-in user
    cursor.execute(
        """
        SELECT notes.file_path
        FROM notes
        JOIN subjects ON notes.subject_id = subjects.id
        WHERE notes.id = %s
        AND subjects.user_id = %s
        """,
        (note_id, current_user["user_id"])
    )

    note = cursor.fetchone()

    if not note:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this note"
        )

    file_path = note["file_path"]

    # Delete note from database
    cursor.execute(
        "DELETE FROM notes WHERE id = %s",
        (note_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    # Delete actual file from uploads folder
    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "message": "Note and file deleted successfully"
    }

@app.delete("/subjects/{subject_id}")
def delete_subject(
    subject_id: int,
    current_user=Depends(get_current_user)
):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    # Check if the subject belongs to the logged-in user
    cursor.execute(
        """
        SELECT id
        FROM subjects
        WHERE id = %s AND user_id = %s
        """,
        (subject_id, current_user["user_id"])
    )

    subject = cursor.fetchone()

    if not subject:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=403,
            detail="You do not have access to this subject"
        )

    # Get all files belonging to this subject
    cursor.execute(
        "SELECT file_path FROM notes WHERE subject_id = %s",
        (subject_id,)
    )

    notes = cursor.fetchall()

    # Delete physical files from uploads folder
    for note in notes:
        file_path = note["file_path"]

        if file_path and os.path.exists(file_path):
            os.remove(file_path)

    # Delete subject
    # Related notes will be deleted automatically because of ON DELETE CASCADE
    cursor.execute(
        "DELETE FROM subjects WHERE id = %s",
        (subject_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Subject and all related notes deleted successfully"
    }