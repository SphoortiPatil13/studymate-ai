import {useState} from "react";
function NoteCard({fileName , fileUrl ,onRename , onDelete, fileType, uploadedOn}){
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(fileName);
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
                gap-4" onClick={() => window.open(fileUrl, "_blank")}>📄
            <div className="flex flex-col">
                {isEditing ? (
                    <input value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    />):(
                
                <h3 className="font-semibold">{fileName}</h3>)}
                <p className="text-sm text-slate-500">{fileType} • {uploadedOn}</p>
                {isEditing && (
                <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 bg-violet-500 text-white rounded"
                    onClick={() => {onRename(newName);
                                    setIsEditing(false);}}>
                    Save
                </button>
                <button className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => {setNewName(fileName);
                                    setIsEditing(false);}}>
                    Cancel
                </button>
                </div>
                )}
                </div>    
                </div>
            <div className="text-2xl text-slate-400">
                <button className="border-2 hover:shadow-md hover:border-slate-100 rounded-xl"
                onClick={() => setShowMenu((prev) => !prev)}> ⋮ 
                </button>
                {showMenu && (
                    <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg"> 
                        <button className="px-4 py-2 hover:bg-gray-100 text-left text-black w-full"
                            onClick={() => {setIsEditing(true);
                                            setShowMenu(false); }}>
                        Rename
                        </button>
                        <button className="px-4 py-2 hover:bg-red-400 text-left text-black w-full p-4" onClick={() => {onDelete();
                            setShowMenu(false);
                            }}>Delete
                        </button>
                     </div>)}
            </div>
            </div>
    )
}
export default NoteCard;