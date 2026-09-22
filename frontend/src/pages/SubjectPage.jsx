import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadNotesCard from "../components/UploadNotesCard";
import NoteCard from "../components/NoteCard";
import { useRef , useContext , useState} from "react";
import {SubjectsContext} from "../context/SubjectsContext";
import AIPanel from "../components/AIPanel";
function SubjectPage() {
    const { id } = useParams();
    const [showAIPanel, setShowAIPanel] = useState(true);
    const fileInputRef = useRef(null);
    const { subjects, setSubjects } = useContext(SubjectsContext);
    const subject = subjects.find((subject) => subject.id === Number(id)) 
    if (!subject) {
    return <h1>Subject not found</h1>;
};
    async function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("subject_id", id);

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/extract`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Failed to upload note");
        }

        const extractedData = await response.json();

        console.log(extractedData);

        const newNote = {
            id: extractedData.id,
            fileName: extractedData.filename,
            fileType: file.type,
            uploadedOn: "Today",
            fileUrl: URL.createObjectURL(file),
            text: extractedData.text,
        };

        setSubjects((prevSubjects) =>
            prevSubjects.map((subject) => {
                if (subject.id === Number(id)) {
                    return {
                        ...subject,
                        notes: [
                            ...subject.notes,
                            newNote,
                        ],
                    };
                }

                return subject;
            })
        );

    } catch (error) {
        console.error("Upload error:", error);
    }
    }
    async function handleDeleteNote(noteId) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete note");
        }

        setSubjects((prevSubjects) =>
            prevSubjects.map((subject) => {
                if (subject.id === Number(id)) {
                    return {
                        ...subject,
                        notes: subject.notes.filter(
                            (note) => note.id !== noteId
                        ),
                    };
                }

                return subject;
            })
        );

    } catch (error) {
        console.error("Delete error:", error);
    }
}
    async function handleRename(noteId, newName) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/notes/${noteId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    file_name: newName,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to rename note");
        }

        const data = await response.json();

        setSubjects((prevSubjects) =>
            prevSubjects.map((subject) => {
                if (subject.id === Number(id)) {
                    return {
                        ...subject,
                        notes: subject.notes.map((note) => {
                            if (note.id === noteId) {
                                return {
                                    ...note,
                                    fileName: data.file_name,
                                };
                            }

                            return note;
                        }),
                    };
                }

                return subject;
            })
        );

    } catch (error) {
        console.error("Rename error:", error);
    }
}
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            
                <main className="flex-1 p-8">
                    <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} />
                    <h1 className="text-3xl font-bold mb-6">
                        {subject.title}
                    </h1>

                    <UploadNotesCard
                        title="Upload Notes"
                        subtitle="PDF • DOCX • PPT • Images"
                        onClick={() => {fileInputRef.current.click()}}
                    />

                    <h2 className="mt-8 mb-4 font-semibold text-xl">
                    Uploaded Notes
                    </h2>
                    {subject.notes.map((note) => (
                    <NoteCard
                    key={note.id}
                    fileName={note.fileName}
                    fileType={note.fileType}
                    uploadedOn={note.uploadedOn}
                    onDelete = {() => handleDeleteNote(note.id)}
                    onRename = {(newName) => handleRename(note.id, newName)}
                    fileUrl = {note.fileUrl}   />
                     ))}
                </main>
            {showAIPanel && (
                <AIPanel
                    subject={subject}
                    onClose={() => setShowAIPanel(false)}
                />
            )}

            {!showAIPanel && (
                <button
                    onClick={() => setShowAIPanel(true)}
                    className="fixed right-4 top-4 z-50 bg-violet-600 text-white px-4 py-2 rounded-lg shadow hover:bg-violet-700"
                >
                🤖 AI
                </button>
            )}
            
        </div>
    );
}
export default SubjectPage;