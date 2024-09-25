import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { LogContext } from "../LogContext";

function ChatVanilla({ artwork, initiateConversation }) {
  console.log("chat with nothing (Vanilla)");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
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

  //initiate conversation
  useEffect(() => {
    if (initiateConversation) {
      initiateChat();
    }
  }, [initiateConversation]);

  const instruction =
    "You are an art appreciation assistant. Your goal is to engage the audience in a conversation that enhances their appreciation of the artwork.\n\
    Avoid overly detailed or complex questions that might reduce engagement, and keep questions concise and straightforward.\n\
    you have to speak Korean.";

  const initiateChat = async () => {
    const initialMessage = { text: instruction, type: "instruction" };
    setMessages((prevMessages) => [...prevMessages, initialMessage]);

    const firstreq = [{ text: instruction, type: "instruction" }];
    getResponseFromServer(firstreq, artwork);
    initiateConversation = false;
  };

  const extractLastTwoMessages = (messages) => {
    const lastUserMessage = messages
      .reverse()
      .find((msg) => msg.type === "query");
    const lastAssistantMessage = messages
      // .reverse()
      .find((msg) => msg.type === "response");
    return [lastAssistantMessage, lastUserMessage];
  };

  const handleSend = async () => {
    if (prompt.trim()) {
      const temp = prompt;
      setPrompt("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: temp, type: "query" },
      ]);

      // 이전 대화와 새 메시지를 서버로 보냄
      const conversationHistory = [...messages, { text: temp, type: "query" }];
      console.log(conversationHistory);
      getResponseFromServer(conversationHistory, artwork); //server_notopicswitch.py

      // 채팅 로그 저장
      const lastTwoMessages = extractLastTwoMessages(conversationHistory);
      saveChatLog({
        pid,
        tid,
        type: "ChatWithVanilla",
        message: lastTwoMessages,
      });
    }
  };

  const handleNoInterest = async () => {
    const noInterestPrompt =
      "사용자가 대화 주제에 흥미를 보이지 않았습니다. 다른 주제로 대화를 시도하세요.";
    const conversationHistory = [
      ...messages,
      { text: noInterestPrompt, type: "instruction" },
    ];
    getResponseFromServer(conversationHistory, artwork);
  };

  const getResponseFromServer = async (conversationHistory, artwork) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: conversationHistory,
          image: artwork,
        }),
      });
      const responseData = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseData.res, type: "response" },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat">
      <div className="messages-container">
        <div className="messages">
          {messages
            .filter((message) => message.type !== "instruction") // instruction 메시지를 렌더링하지 않음
            .map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.text} <br></br>
                {message.type === "response" && (
                  <button
                    className="no-interest-button"
                    onClick={handleNoInterest}
                  >
                    관심 없음!
                  </button>
                )}
              </div>
            ))}
          {loading && (
            <div className="message response loading">Loading...</div>
          )}
          {/* scroll to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={prompt}
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

export default ChatVanilla;
