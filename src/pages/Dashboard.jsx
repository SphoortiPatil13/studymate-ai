import Navbar from "../components/Navbar";
import CreateSubjectCard from "../components/CreateSubjectCard";
import SubjectCard from "../components/SubjectCard";
import Sidebar from "../components/Sidebar";
function Dashboard(){
    const subjects = [
  { title: "Artificial Intelligence", notes: 12 },
  { title: "DBMS", notes: 8 },
  { title: "Computer Networks", notes: 15 }
];
    return(
        <>
        <Navbar title="Dashboard"/>
        <div className="flex">
        <Sidebar/>
        <main className= "flex p-8 flex-1">
            <div className="flex flex-wrap gap-6">
            <CreateSubjectCard title="Add Subject"/> {subjects.map((subject) => (
          <SubjectCard key={subject.title} title={subject.title} notes={subject.notes} />
        ))}
            </div>
        </main>
        </div>
        </>
    )
}
export default Dashboard;