import React from "react";
import Pokedex from "./pokedex.png";
import Pokeball from "./greyPokeball.png";

import "./Header.css";

export default function Header() {
  return (
    <div className="Header">

      <img
        src={Pokedex}
        className="pokedex"
        height="15%"
        width="15%"
        style={{ marginRight: "80%", marginBottom: "-10%", marginTop: "5%" }}
        alt="pokedex"
      />

      <h1 className="heading">Pokédex</h1>

      <img
        src={Pokeball}
        className="rotation"
        height="40%"
        width="40%"
        style={{
          marginLeft: "75%",
          marginTop: "-30%",
          marginBottom: "-15%",
          opacity: 0.95
        }}
        alt="pokeball"
      />
      
    </div>
  );
}
