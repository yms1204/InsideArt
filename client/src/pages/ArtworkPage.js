import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChatWithContext from "../components/Chat/ChatWithContext";
import ChatWithTopic from "../components/Chat/ChatWithTopic";
// import ChatWithFull from "../components/Chat/ChatWithFull";
import ChatVanilla from "../components/Chat/ChatVanilla";
import ChatBasic from "../components/Chat/ChatBasic";
import ChatWithFullTeaser from "../components/Chat/ChatWithFull_teaser";
import "./ArtworkPage.css"; // ArtworkPage.css 파일을 import

// images
import Monalisa from "../images/work5.jpg";
import Starrynight from "../images/Artwork2.jpg";

const artworks = [
  {
    id: 1,
    name: "Mona Lisa",
    image: Monalisa,
    path: "/images/work1.jpg",
  },
  {
    id: 2,
    name: "Starry Night",
    image: Starrynight,
    path: "/images/Artwork2.jpg",
  },
];

function ArtworkPage() {
  const { id } = useParams();
  // const { pid, tid } = useParams();
  const artwork = artworks.find((a) => a.id === parseInt(id));
  const [selectedChat, setSelectedChat] = useState("full");

  const renderChatComponent = () => {
    switch (selectedChat) {
      case "vanilla":
        return (
          <ChatVanilla artwork={artwork.path} initiateConversation={true} />
        );
      case "context":
        return (
          <ChatWithContext artwork={artwork.path} initiateConversation={true} />
        );
      case "topic":
        return (
          <ChatWithTopic artwork={artwork.path} initiateConversation={true} />
        );
      case "full":
        return (
          <ChatWithFullTeaser
            artwork={artwork.path}
            initiateConversation={true}
          />
        );
      default:
        return <ChatBasic />;
    }
  };

  return (
    <div className="artwork-page">
      <div className="artwork-detail">
        <img
          src={artwork.image}
          alt={artwork.name}
          className="artwork-page-image"
        />
        {/* <h2>{artwork.name}</h2> */}
      </div>
      <div className="chat-section">
        <div>{renderChatComponent()}</div>
      </div>
    </div>
  );
}

export default ArtworkPage;
