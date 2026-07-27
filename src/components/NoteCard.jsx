function NoteCard({fileName, fileType, uploadedOn}){
    return(
      <button className="w-full
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
            rounded-xl"  >
            <div className="flex
                items-center
                gap-4">📄
            <div className="flex flex-col"><h3 className="font-semibold">{fileName}</h3>
            <p className="text-sm text-slate-500">{fileType} • {uploadedOn}</p></div>    </div>
            <div className="text-2xl text-slate-400"> ⋮ </div>
            </button>
    )
}
export default NoteCard;