import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubjectCard({ id, title, notes, onDelete }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div
            className="
                w-56
                h-40
                bg-white
                border-4
                border-violet-300
                rounded-2xl
                shadow-sm
                relative
                hover:border-violet-500
                hover:shadow-lg
                transition
                duration-200
            "
        >
            {/* Clickable subject area */}
            <button
                className="
                    w-full
                    h-full
                    flex
                    flex-col
                    items-start
                    text-left
                    px-5
                    pt-5
                    rounded-2xl
                    cursor-pointer
                    active:scale-95
                "
                onClick={() => navigate(`/subject/${id}`)}
            >
                <div className="text-2xl p-2 font-semibold">
                    {title}
                </div>

                <p className="font-light text-slate-500 text-md">
                    📝 Notes: {notes}
                </p>
            </button>

            {/* Three-dot menu */}
            <div className="absolute top-3 right-3">
                <button
                    className="
                        px-2
                        py-1
                        text-lg
                        text-slate-500
                        rounded-lg
                        hover:bg-slate-100
                    "
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu((prev) => !prev);
                    }}
                >
                    ⋮
                </button>

                {showMenu && (
                    <div
                        className="
                            absolute
                            right-0
                            top-9
                            w-28
                            bg-white
                            border
                            rounded-lg
                            shadow-lg
                            overflow-hidden
                            z-10
                        "
                    >
                        <button
                            className="
                                w-full
                                px-4
                                py-2
                                text-left
                                text-red-600
                                hover:bg-red-50
                            "
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(id);
                                setShowMenu(false);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubjectCard;