function SubjectCard({title , notes}) {
  return (
    <button className="w-56
h-40
bg-white
border-4
border-violet-300
rounded-2xl
shadow-sm
flex
flex-col
items-start
text-left
px-5

hover:border-violet-500
hover:shadow-lg
transition
active:scale-95
duration-200
cursor-pointer">
  <div className="text-2xl p-2 font-semibold">{title}</div>
     <p className="font-light font-slate-500 text-md"> 📝 Notes:{notes}</p> 
    </button>

  )
}

export default SubjectCard;