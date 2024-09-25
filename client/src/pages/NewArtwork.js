import React, { useState } from "react";

function NewArtwork() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle the upload of the new artwork
    console.log("Artwork Name:", name);
    console.log("Artwork Description:", description);
  };

  return (
    <div className="new-artwork">
      <h2>Upload New Artwork</h2>
      <input
        type="text"
        placeholder="Artwork Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Artwork Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default NewArtwork;
