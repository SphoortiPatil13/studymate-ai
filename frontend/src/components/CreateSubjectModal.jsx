import {useState} from "react";
import Input from "./Input";
import Button from "./Button";

function CreateSubjectModal({ onClose, onCreate }) {
     const [subjectName, setsubjectName]= useState("");
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-violet-600 mb-6">
                    Create New Subject
                </h2>
                <Input 
      label="Subject Name"
      type="text"
      placeholder="Enter subject name"
      value={subjectName}
      onChange={(e) => setsubjectName(e.target.value)}/>
                <div className="flex gap-4">
                    <Button text="Cancel" className="flex-1" onClick={onClose} />
                    <Button text="Create subject" className="flex-1" onClick={() => { if (subjectName.trim() !== ""){
                                                                onCreate(subjectName)} }} />
                </div>
            </div>
        </div>
    );
}

export default CreateSubjectModal;