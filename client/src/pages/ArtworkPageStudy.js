import React, { useContext } from "react";
import { LogContext } from "../components/LogContext";
import { useParams, useNavigate } from "react-router-dom";
import ChatWithContext from "../components/Chat/ChatWithContext";
import ChatWithTopic from "../components/Chat/ChatWithTopic";
import ChatWithFull from "../components/Chat/ChatWithFull";
import ChatVanilla from "../components/Chat/ChatVanilla";
import ChatBasic from "../components/Chat/ChatBasic";
import "./ArtworkPage.css";
import "./Page.css";

// images
import Artwork1 from "../images/work11.jpg";
import Artwork2 from "../images/work12.jpg";
import Artwork3 from "../images/work3.jpg";
import Artwork4 from "../images/work4.jpg";
import Artwork5 from "../images/work5.jpg";
import Artwork6 from "../images/work6.jpg";
import Artwork7 from "../images/work7.jpg";
import Artwork8 from "../images/work8.jpg";
import Artwork9 from "../images/work9.jpg";
import Artwork10 from "../images/work10.jpg";

const latinSquare_chat = [
  ["basic", "vanilla", "context", "topic", "full"],
  ["basic", "vanilla", "context", "topic", "full"],
  ["full", "basic", "vanilla", "context", "topic"],
  ["full", "basic", "vanilla", "context", "topic"],
  ["topic", "full", "basic", "vanilla", "context"],
  ["topic", "full", "basic", "vanilla", "context"],
  ["context", "topic", "full", "basic", "vanilla"],
  ["context", "topic", "full", "basic", "vanilla"],
  ["vanilla", "context", "topic", "full", "basic"],
  ["vanilla", "context", "topic", "full", "basic"],
];

const latinSquare_artwork = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 1],
  [3, 4, 5, 6, 7, 8, 9, 10, 1, 2],
  [4, 5, 6, 7, 8, 9, 10, 1, 2, 3],
  [5, 6, 7, 8, 9, 10, 1, 2, 3, 4],
  [6, 7, 8, 9, 10, 1, 2, 3, 4, 5],
  [7, 8, 9, 10, 1, 2, 3, 4, 5, 6],
  [8, 9, 10, 1, 2, 3, 4, 5, 6, 7],
  [9, 10, 1, 2, 3, 4, 5, 6, 7, 8],
  [10, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

const artworks = [
  { id: 1, name: "Artwork 1", image: Artwork1, path: "/images/work11.jpg" },
  { id: 2, name: "Artwork 2", image: Artwork2, path: "/images/work12.jpg" },
  { id: 3, name: "Artwork 3", image: Artwork3, path: "/images/work3.jpg" },
  { id: 4, name: "Artwork 4", image: Artwork4, path: "/images/work4.jpg" },
  { id: 5, name: "Artwork 5", image: Artwork5, path: "/images/work5.jpg" },
  { id: 6, name: "Artwork 6", image: Artwork6, path: "/images/work6.jpg" },
  { id: 7, name: "Artwork 7", image: Artwork7, path: "/images/work7.jpg" },
  { id: 8, name: "Artwork 8", image: Artwork8, path: "/images/work8.jpg" },
  { id: 9, name: "Artwork 9", image: Artwork9, path: "/images/work9.jpg" },
  {
    id: 10,
    name: "Artwork 10",
    image: Artwork10,
    path: "/images/work10.jpg",
  },
];

function ArtworkPage() {
  const { pid, tid } = useParams(); // pid와 tid를 URL에서 가져옴
  const navigate = useNavigate();
  const { consentData, infoData, chatLogs, evaluationData } =
    useContext(LogContext);

  // pid와 tid에서 숫자만 추출
  const participantIndex = parseInt(pid.replace("P", "")) - 1; // 'P1' → 0, 'P2' → 1, ...
  const taskIndex = parseInt(tid.replace("T", "")) - 1; // 'T1' → 0, 'T2' → 1, ...

  const handleNext = () => {
    navigate(`/${pid}/${tid}/evaluation`);
    const allData = {
      consentData,
      infoData,
      chatLogs,
      evaluationData,
    };
    console.log("데이터", allData);
  };
  // 채팅 방식과 아트워크를 선택
  const chatType = latinSquare_chat[participantIndex][parseInt(taskIndex / 2)];
  const artwork =
    artworks[latinSquare_artwork[participantIndex][taskIndex] - 1];
  const renderChatComponent = () => {
    const chatKey = `${chatType}-${tid}`;
    switch (chatType) {
      case "vanilla":
        return (
          <ChatVanilla
            key={chatKey}
            artwork={artwork.path}
            initiateConversation={true}
          />
        );
      case "context":
        return (
          <ChatWithContext
            key={chatKey}
            artwork={artwork.path}
            initiateConversation={true}
          />
        );
      case "topic":
        return (
          <ChatWithTopic
            key={chatKey}
            artwork={artwork.path}
            initiateConversation={true}
          />
        );
      case "full":
        return (
          <ChatWithFull
            key={chatKey}
            artwork={artwork.path}
            initiateConversation={true}
          />
        );
      default:
        return <ChatBasic key={chatKey} artwork={artwork.path} />;
    }
  };

  return (
    <div className="container">
      <div className="artwork-page">
        <div className="artwork-detail">
          <img
            src={artwork.image}
            alt={artwork.name}
            className="artwork-page-image"
          />
          {/* <h2 style={{ textAlign: "center" }}>{artwork.name}</h2> */}
        </div>
        <div className="chat-section">{renderChatComponent()}</div>
      </div>
      <div className="button-container">
        <button type="button" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default ArtworkPage;
