import { createContext, useState, useEffect } from "react";

export const SubjectsContext = createContext();

function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    async function fetchSubjects() {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setSubjects([]);
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/subjects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch subjects");
            }

            const subjectsData = await response.json();

            const subjectsWithNotes = await Promise.all(
                subjectsData.map(async (subject) => {
                    const notesResponse = await fetch(
                        `http://127.0.0.1:8000/subjects/${subject.id}/notes`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const notesData = await notesResponse.json();

                    return {
                        id: subject.id,
                        title: subject.title,

                        notes: notesData.map((note) => ({
                            id: note.id,
                            fileName: note.file_name,
                            fileType: note.file_type,
                            uploadedOn: note.uploaded_at,
                            fileUrl: `http://127.0.0.1:8000/${note.file_path}`,
                            text: note.extracted_text,
                        })),
                    };
                })
            );

            setSubjects(subjectsWithNotes);

        } catch (error) {
            console.error("Error loading subjects:", error);
        }
    }

    useEffect(() => {
        fetchSubjects();

        function handleAuthChange() {
            fetchSubjects();
        }

        window.addEventListener("authChanged", handleAuthChange);

        return () => {
            window.removeEventListener(
                "authChanged",
                handleAuthChange
            );
        };
    }, []);

    return (
        <SubjectsContext.Provider
            value={{
                subjects,
                setSubjects,
                fetchSubjects,
            }}
        >
            {children}
        </SubjectsContext.Provider>
    );
}

export default SubjectsProvider;