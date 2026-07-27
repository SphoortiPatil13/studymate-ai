import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadNotesCard from "../components/UploadNotesCard";
import NoteCard from "../components/NoteCard";
import { useRef } from "react";
function SubjectPage() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const notes = [
  {
    fileName: "Introduction to AI.pdf",
    fileType: "PDF",
    uploadedOn: "Today",
  },
  {
    fileName: "Unit2.pptx",
    fileType: "PPT",
    uploadedOn: "Yesterday",
  },
];
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            
                <main className="flex-1">
                    <input type="file" ref={fileInputRef} hidden />
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
            <aside className="w-96">
                AI Panel
            </aside>
            
        </div>
    );
}
export default SubjectPage;