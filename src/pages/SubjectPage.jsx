import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadNotesCard from "../components/UploadNotesCard";
import NoteCard from "../components/NoteCard";
import { useRef , useState } from "react";
import AIPanel from "../components/AIPanel";
function SubjectPage() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [notes , setNotes] = useState([]);
    function handleFileUpload(e){
        const file = e.target.files[0];
        console.log(file);
        const newNote= {
            fileName: file.name,
            fileType: file.type,
            uploadedOn: "Today"
        };
        setNotes([...notes, newNote]);
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            
                <main className="flex-1 p-8">
                    <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} />
                    <h1 className="text-3xl font-bold mb-6">
                        {id}
                    </h1>

                    <UploadNotesCard
                        title="Upload Notes"
                        subtitle="PDF • DOCX • PPT • Images"
                        onClick={() => {fileInputRef.current.click()}}
                    />

                    <h2 className="mt-8 mb-4 font-semibold text-xl">
                    Uploaded Notes
                    </h2>
                    {notes.map((note) => (
                    <NoteCard
                    key={note.fileName}
                    fileName={note.fileName}
                    fileType={note.fileType}
                    uploadedOn={note.uploadedOn}
                    />
                    ))}
                </main>
            <AIPanel />
            
        </div>
    );
}
export default SubjectPage;