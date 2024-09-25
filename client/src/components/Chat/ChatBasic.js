import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { LogContext } from "../LogContext";

function ChatBasic({ artwork, initiateConversation }) {
  console.log("basic (write a comment)");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const messagesEndRef = useRef(null);
  const { pid, tid } = useParams();
  const { saveChatLog } = useContext(LogContext);

  ////scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  ////

  const handleSend = async () => {
    if (prompt.trim()) {
      const temp = prompt;
      setPrompt("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: temp, type: "query" },
      ]);

      // 채팅 로그 저장
      const newMessage = { text: temp, type: "query" };
      saveChatLog({ pid, tid, type: "ChatBasic", message: newMessage });
    }
  };

  return (
    <div className="chat">
      <div className="messages-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.text}
            </div>
          ))}
          {/* scroll to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={prompt}
          placeholder="작품에 대한 감상을 자유롭게 적어주세요."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            e.nativeEvent.isComposing === false &&
            handleSend()
          }
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}

export default ChatBasic;
