

function CreateSubjectCard({title , onClick}) {
 
  return (
    <button 
    onClick={onClick}
    className="w-56
h-40
bg-white
border-5
border-dashed
border-violet-300
rounded-2xl
shadow-sm
flex
flex-col
items-center
justify-center
gap-3
hover:border-violet-500
hover:shadow-lg
transition
duration-200
cursor-pointer
active:scale-95">
  <div className="text-6xl font-light">+</div>
     <p className="font-semibold text-2xl">{title}</p> 
   
    
       </button>
  )
}

export default CreateSubjectCard;