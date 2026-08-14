function Navbar({title}) {
  return (
    <header className="bg-white px-8 py-4 h-16 shadow-md">
      <div className="flex justify-between text-3xl font-bold text-violet-500 items-center">
        <h2>{title}</h2>
        <div className="text-sm text-slate-500 bg-violet-100 p-2 rounded-lg cursor-pointer transition duration-200 hover:bg-violet-300 active:scale-95">
          <h2>Profile</h2>
        </div>
      </div>
    </header>
  )
}

export default Navbar;