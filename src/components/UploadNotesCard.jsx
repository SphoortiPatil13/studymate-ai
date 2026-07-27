function UploadNotesCard({title , subtitle , onClick}) {
    return (
            <button className="bg-white 
            w-72
            h-48
            border-violet-500 
            border-dashed
            border-4
            rounded-2xl
            hover:border-violet-100
            hover:shadow-lg
            transition
            duration-200
            active:scale-95
            cursor-pointer
            font-bold
            text-violet-600
            text-2xl
            flex
            flex-col
            items-center
            justify-center
            gap-3" onClick={onClick}>
                <div className="text-5xl">📄</div>
                <div>{title}</div>
                <div className="text-sm text-slate-500 font-light">{subtitle}</div>
            </button>
    );
}
export default UploadNotesCard;
