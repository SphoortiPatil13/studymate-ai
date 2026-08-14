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
    function handleCreateSubject(subjectName){
        const newSubject = { id: Date.now(),
                            title: subjectName, 
                            notes: []};
        setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
        setShowModal(false);
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
                <SubjectCard key={subject.id} id={subject.id} title={subject.title} notes={subject.notes.length} />
            ))}
           
            </div>
        </main>
        </div>
        </>
    );
}
export default Dashboard;