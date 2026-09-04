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
    const [chatId, setChatId] = useState(null);
    const [chats, setChats] = useState([]);
    const messagesEndRef = useRef(null);
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",});
      }, [messages]);
    useEffect(() => {
    async function fetchChats() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/subjects/${subject.id}/chats`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch chats");
            }

            const data = await response.json();

            setChats(data);
            if (data.length > 0) {
              setChatId(data[0].id);
            }
        } catch (error) {
            console.error("Error loading chats:", error);
        }
    }

    fetchChats();
    }, [subject.id]);
    useEffect(() => {
    if (!chatId) return;

    async function fetchMessages() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/chats/${chatId}/messages`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }

            const data = await response.json();

            const formattedMessages = data.map((message) => ({
                id: message.id,
                sender: message.sender,
                text: message.message,
            }));

            setMessages(formattedMessages);

        } catch (error) {
            console.error("Error loading messages:", error);
        }
    }

    fetchMessages();
}, [chatId]);
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
         let currentChatId = chatId;

    // Create a new chat if this is the first question
    if (!currentChatId) {
        const chatResponse = await fetch(
            "http://127.0.0.1:8000/chats",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    subject_id: subject.id,
                    title: question.slice(0, 50),
                }),
            }
        );

        if (!chatResponse.ok) {
            throw new Error("Failed to create chat");
        }

        const chatData = await chatResponse.json();

        currentChatId = chatData.id;
        setChatId(chatData.id);
    }
      // Save user's message
      await fetch(
        `http://127.0.0.1:8000/chats/${currentChatId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
            body: JSON.stringify({
            sender: "user",
            message: question,
          }),
        }
      );
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
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        // Save AI response
        await fetch(
          `http://127.0.0.1:8000/chats/${currentChatId}/messages`,
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            sender: "ai",
            message: data.answer,
            }),
          }
        );
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
console.log("Chats:", chats);            
    
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