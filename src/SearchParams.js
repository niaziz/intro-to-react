import { useState, useEffect } from "react";
import Result from "./Result";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "reptile", "rabbit"];

const SearchParams = () => {
  // As a rule of thumb, do not use any if statement with the useState Hook
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [BREEDS] = useBreedList(animal);


  useEffect(() => {
    requestPets();
  }, [])// eslint-disable-line

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location
          <input id="location" value={location} placeholder="Location"
            onChange={(e) => { setLocation(e.target.value) }}></input>
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value)
              // You can also use the blur event along with onChange event
            }}>
            <option />

            {BREEDS.map((bree) => (
              <option key={bree} value={bree}>
                {bree}
              </option>
            ))}

          </select>
        </label>
        <button>Submit</button>
      </form>
      {
        <Result
          pets={pets}
        />
      }

      {/*
        This one the controlled form. We are using the useState Hook to keep track of the value of the input.
      */}
      {/* <form>
        <label htmlFor="location">Location
          {location}
          <input id="location" value={location} placeholder="Location"
            onChange={(e) => { setLocation(e.target.value) }}></input>
        </label>
        <button>Submit</button>
      </form> */}
    </div >
  )
}

export default SearchParams;