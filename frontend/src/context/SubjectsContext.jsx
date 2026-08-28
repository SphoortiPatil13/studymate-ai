import { createContext, useState, useEffect } from "react";

export const SubjectsContext = createContext();

function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                // Get all subjects
                const token = localStorage.getItem("token");
                console.log("Token being sent:", token);
                const response = await fetch(
                    "http://127.0.0.1:8000/subjects",
                    {
                        headers: {
                            Authorization:`Bearer ${token}`,
                        },
                    }
                );
                console.log("Subjects response:", response.status);
                if (!response.ok) {
                    throw new Error("Failed to fetch subjects");
                }

                const subjectsData = await response.json();
                console.log("Subjects data:", subjectsData);
                // Get notes for every subject
                const subjectsWithNotes = await Promise.all(
                    subjectsData.map(async (subject) => {

                        const notesResponse = await fetch(
                            `http://127.0.0.1:8000/subjects/${subject.id}/notes`
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

        fetchSubjects();
    }, []);

    return (
        <SubjectsContext.Provider value={{ subjects, setSubjects }}>
            {children}
        </SubjectsContext.Provider>
    );
}

export default SubjectsProvider;