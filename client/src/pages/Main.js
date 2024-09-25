import React from "react";
import { Link } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";

//images
import Monalisa from "../images/Artwork1.jpg";
import Starrynight from "../images/Artwork2.jpg";

const artworks = [
  {
    id: 1,
    name: "Mona Lisa",
    description: "A painting by Leonardo da Vinci",
    image: Monalisa,
  },
  {
    id: 2,
    name: "Starry Night",
    description: "A painting by Vincent van Gogh",
    image: Starrynight,
  },
];

function Main() {
  return (
    <div>
      <div className="header">
        <input type="text" placeholder="Search..." />
        <Link to="/new">
          <button>New</button>
        </Link>
      </div>
      <div className="artworks">
        {artworks.map((artwork) => (
          <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
            <ArtworkCard
              name={artwork.name}
              description={artwork.description}
              image={artwork.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Main;
