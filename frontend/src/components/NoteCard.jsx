import { useState } from "react";

function NoteCard({
    fileName,
    fileUrl,
    onRename,
    onDelete,
    fileType,
    uploadedOn
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(fileName);
    const [showMenu, setShowMenu] = useState(false);

    function handleSave() {
        if (newName.trim() === "") return;

        onRename(newName);
        setIsEditing(false);
    }

    function handleCancel() {
        setNewName(fileName);
        setIsEditing(false);
    }

    return (
        <div
            className="
                w-full
                mb-3
                bg-white
                shadow-sm
                border
                p-4
                flex
                justify-between
                items-center
                hover:shadow-md
                hover:border-slate-200
                transition
                duration-200
                rounded-xl
                relative
            "
        >
            {/* Note information */}
            <div
                className="flex items-center gap-4 flex-1 cursor-pointer"
                onClick={() => {
                    if (!isEditing) {
                        window.open(fileUrl, "_blank");
                    }
                }}
            >
                <span className="text-2xl">📄</span>

                <div className="flex flex-col flex-1">
                    {isEditing ? (
                        <div
                            className="flex gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                value={newName}
                                onChange={(e) =>
                                    setNewName(e.target.value)
                                }
                                className="
                                    border
                                    rounded-lg
                                    px-3
                                    py-2
                                    flex-1
                                    outline-none
                                    focus:ring-2
                                    focus:ring-violet-400
                                "
                                autoFocus
                            />

                            <button
                                className="
                                    px-3
                                    py-2
                                    bg-violet-600
                                    text-white
                                    rounded-lg
                                    hover:bg-violet-700
                                "
                                onClick={handleSave}
                            >
                                Save
                            </button>

                            <button
                                className="
                                    px-3
                                    py-2
                                    bg-slate-200
                                    rounded-lg
                                    hover:bg-slate-300
                                "
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <h3 className="font-semibold">
                            {fileName}
                        </h3>
                    )}

                    <p className="text-sm text-slate-500">
                        {fileType} • {uploadedOn}
                    </p>
                </div>
            </div>

            {/* Three-dot menu */}
            <div className="relative ml-4">
                <button
                    className="
                        text-xl
                        text-slate-500
                        px-2
                        py-1
                        rounded-lg
                        hover:bg-slate-100
                    "
                    onClick={() =>
                        setShowMenu((prev) => !prev)
                    }
                >
                    ⋮
                </button>

                {showMenu && (
                    <div
                        className="
                            absolute
                            right-0
                            top-10
                            w-32
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
                                px-4
                                py-2
                                hover:bg-slate-100
                                text-left
                                w-full
                            "
                            onClick={() => {
                                setIsEditing(true);
                                setShowMenu(false);
                            }}
                        >
                            Rename
                        </button>

                        <button
                            className="
                                px-4
                                py-2
                                hover:bg-red-50
                                text-left
                                text-red-600
                                w-full
                            "
                            onClick={() => {
                                onDelete();
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

export default NoteCard;