import {useState} from "react";
function NoteCard({fileName , onDelete, fileType, uploadedOn}){
    const [showMenu , setShowMenu] = useState(false);
    return(
      <div className="w-full
            mb-3
            bg-white
            shadow-sm
            border-3
            p-4
            flex
            justify-between
            items-center
            hover:shadow-md
            hover:border-slate-100
            cursor-pointer
            transition
            duration-200
            active-scale-95
            rounded-xl
            relative" >
            <div className="flex
                items-center
                gap-4" onClick={() => console.log("Open note")}>📄
            <div className="flex flex-col"><h3 className="font-semibold">{fileName}</h3>
            <p className="text-sm text-slate-500">{fileType} • {uploadedOn}</p></div>    
            </div>
            <div className="text-2xl text-slate-400">
                <button className="border-2 hover:shadow-md hover:border-slate-100 rounded-xl"
                onClick={() => setShowMenu((prev) => !prev)}> ⋮ </button>
                {showMenu && (
                    <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg"> 
                        <button className="px-4 py-2 hover:bg-red-400 text-left text-black w-full p-4" onClick={() => {onDelete();
                        setShowMenu(false);
                    }}>Delete</button> </div>

                )}
            </div>
            </div>
    )
}
export default NoteCard;