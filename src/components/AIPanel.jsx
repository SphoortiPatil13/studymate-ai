import Button from "./Button";
import Input from "./Input";
import { useState , useRef , useEffect } from "react";

function AIPanel() {
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
    const messagesEndRef = useRef(null);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",});
      }, [messages]);
    function handleSend(){
        if (input.trim() === "") return;
         const userMessage = {
    id: Date.now(),
    sender: "user",
    text: input,
    };
    setMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
        ]);

        setInput("");
        setTimeout(() => {
          const aiMessage = {
              id: Date.now() + 1,
              sender: "ai",
              text: "I'm not connected yet, but soon I'll answer using your uploaded notes."};
            setMessages((prevMessages) => [
              ...prevMessages,
              aiMessage,
            ]);
            }, 1000)
    }
    
  return (
    <aside className="w-96 border-l bg-white flex flex-col">
      <h2 className="text-2xl font-bold p-6 border-b">
        🤖 AI Study Assistant
      </h2>

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
          {message.text} 
          </div> </div>))}
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

        <Button text="➤" className="px-5 py-3" onClick={handleSend}/>
        </div>
    </aside>
  );
}

export default AIPanel;