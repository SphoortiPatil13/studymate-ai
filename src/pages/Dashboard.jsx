import { useState } from "react";
import Navbar from "../components/Navbar";
import CreateSubjectCard from "../components/CreateSubjectCard";
import SubjectCard from "../components/SubjectCard";
import Sidebar from "../components/Sidebar";
import CreateSubjectModal from "../components/CreateSubjectModal";
function Dashboard(){
    const [subjects, setsubjects] = useState([
  { title: "Artificial Intelligence", notes: 12 },
  { title: "DBMS", notes: 8 },
  { title: "Computer Networks", notes: 15 }]);
    const [showModal, setShowModal]= useState(false);
    function handleCreateSubject(subjectName){
        console.log(subjectName);
    }
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
                <SubjectCard key={subject.title} title={subject.title} notes={subject.notes} />
            ))}
           
            </div>
        </main>
        </div>
        </>
    );
}
export default Dashboard;