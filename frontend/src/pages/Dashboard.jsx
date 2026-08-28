import { useState , useContext } from "react";
import Navbar from "../components/Navbar";
import CreateSubjectCard from "../components/CreateSubjectCard";
import SubjectCard from "../components/SubjectCard";
import Sidebar from "../components/Sidebar";
import { SubjectsContext } from "../context/SubjectsContext";
import CreateSubjectModal from "../components/CreateSubjectModal";
function Dashboard(){
    const { subjects, setSubjects } = useContext(SubjectsContext);
    const [showModal, setShowModal]= useState(false);
    async function handleDeleteSubject(subjectId) {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/subjects/${subjectId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete subject");
        }

        setSubjects((prevSubjects) =>
            prevSubjects.filter(
                (subject) => subject.id !== subjectId
            )
        );

    } catch (error) {
        console.error("Delete subject error:", error);
    }
}
    
    async function handleCreateSubject(subjectName) {
    try {
        const response = await fetch("http://127.0.0.1:8000/subjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title: subjectName,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create subject");
        }

        const data = await response.json();

        const newSubject = {
            id: data.id,
            title: data.title,
            notes: [],
        };

        setSubjects((prevSubjects) => [
            ...prevSubjects,
            newSubject,
        ]);

        setShowModal(false);

    } catch (error) {
        console.error(error);
    }
    }
    console.log(subjects);
    return(
        <>
        <Navbar title="Dashboard"/>
        <div className="flex">
        <Sidebar/>
        {showModal &&  <CreateSubjectModal 
            onClose={() => setShowModal(false)}
            onCreate={handleCreateSubject}
        />}
        <main className= "flex p-8 flex-1">
            <div className="flex flex-wrap gap-6">
            <CreateSubjectCard title="Add Subject" onClick={() => setShowModal(true)} />
            {subjects.map((subject) => (
                <SubjectCard key={subject.id} id={subject.id} title={subject.title} notes={subject.notes.length} onDelete={handleDeleteSubject} />
            ))}
           
            </div>
        </main>
        </div>
        </>
    );
}
export default Dashboard;