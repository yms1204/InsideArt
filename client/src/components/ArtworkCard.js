import React from "react";

function ArtworkCard({ name, description, image }) {
  return (
    <div className="artwork-card">
      {/* 이미지 표시 */}
      {image && (
        <img
          src={image}
          alt={name}
          className="artwork-image"
          width="30%"
          height="auto"
        />
      )}
      <div className="artwork-name">{name}</div>
      {/* <p>{description}</p> */}
    </div>
  );
}

export default ArtworkCard;
