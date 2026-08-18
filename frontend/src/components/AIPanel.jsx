import Button from "./Button";
import Input from "./Input";
import { useState , useRef , useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIPanel({subject}) {
    console.log(subject);
    const [messages, setMessages]= useState([{
    id: 1,
    sender: "ai",
    text: "👋 Hi! I'm StudyMate AI.",
  },
  {
    id: 2,
    sender: "ai",
    text: "Upload your notes and ask me anything about them.",
  },]);
    const [input , setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",});
      }, [messages]);
    async function handleSend() {
    if (input.trim() === "" || isLoading) return;

    setIsLoading(true);

    const userMessage = {
        id: Date.now(),
        sender: "user",
        text: input,
    };

    setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
    ]);

    const question = input;
    setInput("");

    try {
        // Get text from all notes uploaded to this subject
        const noteText = subject.notes
            .map((note) => note.text || "")
            .join("\n\n");
        const hasNotes = noteText.trim().length > 0;

        const endpoint = hasNotes
        ? "http://127.0.0.1:8000/ask-from-notes"
        : "http://127.0.0.1:8000/ask";
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
              hasNotes
              ?{
                question: question,
                note_text: noteText,
            }
            :{
                question: question
            }),
        });

        if (!response.ok) {
            throw new Error("Something went wrong with the request");
        }

        const data = await response.json();

        const aiMessage = {
            id: Date.now() + 1,
            sender: "ai",
            text: data.answer,
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            aiMessage,
        ]);

    } catch (error) {
        console.error(error);

        const errorMessage = {
            id: Date.now() + 1,
            sender: "ai",
            text: "Sorry, I couldn't get a response right now. Please try again.",
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            errorMessage,
        ]);

    } finally {
        setIsLoading(false);
    }
}
            
    
  return (
    <aside className="w-96 border-l bg-white flex flex-col">
      <h2 className="text-2xl font-bold p-6 border-b">
        🤖 AI Study Assistant
      </h2>
      <div className="px-6 py-3 border-b text-sm text-slate-600">
      <p>
        <strong>Subject:</strong> {subject.title}
      </p>
      <p>
        <strong>Notes:</strong> {subject.notes.length}
      </p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${
              message.sender==="user"
              ? "justify-end"
              : "justify-start"
            }`}>
         <div className={`p-3 rounded-2xl max-w-[75%] ${
          message.sender === "user"
            ? "bg-violet-600 text-white"
            : "bg-violet-100 text-black"
           }`}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
          </div> </div>))}
          {isLoading && (
          <div className="flex mb-4 justify-start">
            <div className="p-3 rounded-2xl bg-violet-100 text-black">
              🤖 Thinking...
            </div>
          </div>
          )}
          <div ref={messagesEndRef}></div>
      </div>

      <div className="flex gap-2 items-center p-4 border-t">
            <div className="flex-1">
            <Input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange= {(e)=>setInput(e.target.value)}
            onKeyDown = {(e)=> e.key === "Enter" && handleSend()}
            />
            </div>

        <Button text="➤" className="px-5 py-3" onClick={handleSend} disabled={isLoading}/>
        </div>
    </aside>
  );
}

export default AIPanel;