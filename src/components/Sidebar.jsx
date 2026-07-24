function Sidebar() {
  return(
    <aside className="flex flex-col w-60 bg-white min-h-screen p-4 shadow-md">
        <h1 className="text-3xl font-bold text-violet-600 text-center my-4">StudyMate AI</h1>
        <nav className="flex flex-1">
            <ul className="flex flex-col w-full">
                <li className="p-3 bg-violet-400 cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-white">Dashboard</li>
                <li className="p-3 bg-white cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-slate-600">Settings</li>
                <li className="p-3 bg-white cursor-pointer rounded-lg transition duration-200 hover:bg-violet-400 my-3 text-slate-600">Logout</li>
            </ul>
        </nav>
        <div className="text-center justify-center mt-8 p-4 bg-violet-100 rounded-lg cursor-pointer transition duration-200 hover:bg-violet-500 active:scale-95">
            Profile
        </div>
    </aside>
  )
}

export default Sidebar;