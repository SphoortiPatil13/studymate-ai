import { createContext, useState, useEffect } from "react";

export const SubjectsContext = createContext();

function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState(() => {
        const savedSubjects = localStorage.getItem("subjects");

        if (savedSubjects) {
            return JSON.parse(savedSubjects);
        }

        return [
            {
                id: 1,
                title: "Artificial Intelligence",
                notes: [
                    {
                        fileName: "Unit1.pdf",
                        fileType: "PDF",
                        uploadedOn: "Today",
                    },
                ],
            },
            {
                id: 2,
                title: "DBMS",
                notes: [],
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    return (
        <SubjectsContext.Provider value={{ subjects, setSubjects }}>
            {children}
        </SubjectsContext.Provider>
    );
}

export default SubjectsProvider;