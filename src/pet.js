import { Link } from "react-router-dom";

export default function Pet({ name, animal, breed, location, id, images }) {

  let hero = "https://placecorgi.com/300/300";

  if (images.length) {
    hero = images[0]
  }

  return (
    <Link className="pet" to={`./details/${id}`}>
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{animal} - {breed} - {location}</h2>
      </div>
    </Link>
  );
}