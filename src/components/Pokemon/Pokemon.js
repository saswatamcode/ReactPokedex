import React from "react";
import "./Pokemon.css";
import spinner from "./spinner.gif";
import Img from "react-image";

export default function Pokemon({ name, imageUrl, onClick }) {
  const [didLoad, setLoad] = React.useState(false);
  const style = didLoad ? {} : { display: "none" };
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="pokemon" onClick={onClick}>
      {didLoad !== true ? (
        <img
          src={spinner}
          style={{
            height: "150px",
            width: "150px",
            marginBottom: "25px",
            marginTop: "25px"
          }}
          alt="spinner"
        ></img>
      ) : null}
      <Img
        src={imageUrl + "?" + Date.now.toString("ddMMyyyyhhmmsstt")}
        style={style}
        className="pokeimage"
        onLoad={() => setLoad(true)}
        alt="pokemon"
      ></Img>
      <div className="pokemoninfo">
        <div className="pokename">{name}</div>
      </div>
    </div>
  );
}
