import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadNotesCard from "../components/UploadNotesCard";
import NoteCard from "../components/NoteCard";
import { useRef , useContext } from "react";
import {SubjectsContext} from "../context/SubjectsContext";
import AIPanel from "../components/AIPanel";
function SubjectPage() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const { subjects, setSubjects } = useContext(SubjectsContext);
    const subject = subjects.find((subject) => subject.id === Number(id)) 
    if (!subject) {
    return <h1>Subject not found</h1>;
};
    function handleFileUpload(e){
        const file = e.target.files[0];
        if (!file) return;
        const newNote = {
        id: Date.now(),
        fileName: file.name,
        fileType: file.type,
        uploadedOn: "Today",};
        console.log(file);
        setSubjects(
        subjects.map((subject) => {
        if (subject.id === Number(id)) {
            return {
                ...subject,
                notes: [...subject.notes, newNote]
            };
        }

        return subject;
    })
);
    }
    function handleDeleteNote(noteId) {
                        setSubjects(
                            (prevSubjects) => prevSubjects.map((s) => {
                                if (s.id === Number(id)) {
                                    return {
                                        ...s,
                                        notes: s.notes.filter((n) => n.id !== noteId)
                                    };
                                }
                                return s;
                            })
                        );
                    }
    function handleRename(noteId, newName){
        setSubjects((prevSubjects) =>
            prevSubjects.map((subject) => {
            if (subject.id === Number(id)) {
                return {
                    ...subject,
                    notes: subject.notes.map((note) => {
                        if (note.id === noteId) {
                            return {
                                ...note,
                                fileName: newName
                            };
                        }

                        return note;
                    })
                };}
        return subject; }));}
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
                    onRename = {(newName) => handleRename(note.id, newName)}/>
                    ))}
                </main>
            <AIPanel subject={subject} />
            
        </div>
    );
}
export default SubjectPage;