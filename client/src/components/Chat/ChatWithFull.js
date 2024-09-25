import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { LogContext } from "../LogContext";

function ChatWithFull({ artwork, initiateConversation }) {
  console.log("chat with full condition");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [score, setScore] = useState();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { pid, tid } = useParams();
  const { saveChatLog } = useContext(LogContext);
  console.log(loading);

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
    "You are an art appreciation assistant. Your goal is to engage the audience in a conversation that enhances their appreciation of the artwork. The conversation should use four techniques: questioning, clarifying, paraphrasing, and remembering details.\n\
    Start with a questioning to engage the audience. Based on their response, categorize your next statement or question into one of the four techniques.\n\
    Avoid overly detailed or complex questions that might reduce engagement, and keep questions concise and straightforward.\n\
    Ask about various aspects of the artwork that can be appreciated without not only emotions (e.g., color, materials, composition, etc.).\n\
    you have to speak Korean.";

  const scoreinstruction =
    "If the user’s interest score is 0, you should change the major subject of the conversation. Transition smoothly to a new topic or a different dimension of analysis to maintain engagement.\n\
  else if the user’s interest score is above 1, you should continue the conversation smoothly.";

  const topicinstruction = `Topic: 
  Visual Dimension (시각적 차원)
	  구성 (Composition)
	  색감 (Color)
	  형태 및 선 (Shape & Line)
	  질감 (Texture)
	  공간 (Space): 작품의 공간감, 배경과 전경의 관계 등을 포함.

  Emotional Dimension (감정적 차원)
    감정적 반응 (Emotional Reaction): 작품이 불러일으키는 감정에 대한 분석.
    분위기 (Mood): 작품의 전반적인 분위기와 톤.
    상징성 (Symbolism): 작품 내의 상징물과 그로 인한 감정적 효과.

  Technical Dimension (기술적 차원)
    기법 (Technique)
    재료 (Material): 사용된 재료의 특성과 그 효과.
    작업 과정 (Process): 작품이 만들어진 과정과 방법.

  Imaginative Dimension (상상적 차원)
    작가의 의도 (Artist’s Intent)
    상상 속 변화 (Imaginative Changes)
    대체 현실 (Alternate Realities): 작품 속 장면이나 인물을 상상 속 다른 설정으로 변형해보는 접근.`;

  const initiateChat = async () => {
    const initialMessage = {
      text: instruction + scoreinstruction + topicinstruction,
      type: "instruction",
    };
    setMessages((prevMessages) => [...prevMessages, initialMessage]);

    const firstreq = [{ text: instruction, type: "instruction" }];
    getResponseFromServer(firstreq, artwork); //server_topicswitch.py
    initiateConversation = false;
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

  const extractLastTwoMessages = (messages) => {
    const lastUserMessage = messages
      .reverse()
      .find((msg) => msg.type === "query");
    const lastAssistantMessage = messages
      // .reverse()
      .find((msg) => msg.type === "response");
    messages.reverse();
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
      const updatedMessages = [...messages, { text: temp, type: "query" }];

      //get score
      const lastTwoMessages = extractLastTwoMessages(updatedMessages);
      const score = await getScoreFromServer(lastTwoMessages); //server_getscore.py
      console.log(updatedMessages, lastTwoMessages);
      getResponseFromServer(updatedMessages, artwork, score); //server_topicswitch.py

      // 채팅 로그 저장
      const newMessage = { lastTwoMessages };
      saveChatLog({ pid, tid, type: "ChatWithFull", message: lastTwoMessages });
    }
  };

  const getResponseFromServer = async (conversationHistory, artwork, score) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4002/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: conversationHistory,
          image: artwork,
          score: score,
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

  const getScoreFromServer = async (lastTwoMessages) => {
    setLoading(true);
    try {
      const score = await fetch("http://localhost:4001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastTwoMessages,
        }),
      });
      const scoreData = await score.json();
      setScore(scoreData.res);
      return scoreData.res;
    } catch (error) {
      console.error(error);
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
                {message.text}
                <br></br>
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
          // onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}

export default ChatWithFull;
