import { createContext, useState, useEffect } from "react";

export const SubjectsContext = createContext();

function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/subjects"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch subjects");
                }

                const data = await response.json();

                // Add an empty notes array because notes
                // are not stored in MySQL yet
                const formattedSubjects = data.map((subject) => ({
                    id: subject.id,
                    title: subject.title,
                    notes: [],
                }));

                setSubjects(formattedSubjects);

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