import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ProgressBar from "../../layout/ProgressBar/ProgressBar";
import "./PokemonModal.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default function PokemonModal({ pokemonIndex, open, handleClose }) {
  const [pokemonRes, setPokemonRes] = useState({});
  const [pokeSpeciesRes, setPokeSpeciesRes] = useState({});

  const [err, setErr] = useState();
  const [speciesErr, setSpeciesErr] = useState();

  const [pokeprop, setPokeProp] = useState({
    name: "",
    imageUrl: "",
    types: [],
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    description: "",
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    hatchSteps: "",
    abilities: "",
    evs: "",
    themeColor: "#EF5350"
  });

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

  useEffect(() => {
    fetch(pokemonUrl, {})
      .then(res => res.json())
      .then(response => {
        setPokemonRes(response);
      })
      .catch(error => setErr(error));
  }, []);

  useEffect(() => {
    fetch(pokemonSpeciesUrl, {})
      .then(res => res.json())
      .then(response => {
        setPokeSpeciesRes(response);
      })
      .catch(error => setSpeciesErr(error));
  }, []);

  useEffect(() => {
    if (
      pokemonRes.name !== undefined &&
      pokeSpeciesRes.flavor_text_entries !== undefined
    ) {
      let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

      pokemonRes.stats.map(stat => {
        switch (stat.stat.name) {
          case "hp":
            hp = stat["base_stat"];
            break;
          case "attack":
            attack = stat["base_stat"];
            break;
          case "defense":
            defense = stat["base_stat"];
            break;
          case "speed":
            speed = stat["base_stat"];
            break;
          case "special-attack":
            specialAttack = stat["base_stat"];
            break;
          case "special-defense":
            specialDefense = stat["base_stat"];
            break;
          default:
            break;
        }
      });

      // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
      const height =
        Math.round((pokemonRes.height * 0.328084 + 0.00001) * 100) / 100;

      const weight =
        Math.round((pokemonRes.weight * 0.220462 + 0.00001) * 100) / 100;

      const types = pokemonRes.types.map(type => type.type.name);

      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

      const abilities = pokemonRes.abilities
        .map(ability => {
          return ability.ability.name
            .toLowerCase()
            .split("-")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const evs = pokemonRes.stats
        .filter(stat => {
          if (stat.effort > 0) {
            return true;
          }
          return false;
        })
        .map(stat => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split("-")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}`;
        })
        .join(", ");

      let description = "";
      pokeSpeciesRes.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = pokeSpeciesRes["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round(
        (100 / 255) * pokeSpeciesRes["capture_rate"]
      );

      const eggGroups = pokeSpeciesRes["egg_groups"]
        .map(group => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (pokeSpeciesRes["hatch_counter"] + 1);

      setPokeProp({
        name:
          pokemonRes.name.charAt(0).toUpperCase() + pokemonRes.name.slice(1),
        imageUrl: pokemonRes.sprites.front_default,
        types: types,
        stats: {
          hp: hp,
          attack: attack,
          defense: defense,
          speed: speed,
          specialAttack: specialAttack,
          specialDefense: specialDefense
        },
        description: description,
        height: height,
        weight: weight,
        eggGroups: eggGroups,
        catchRate: catchRate,
        genderRatioMale: genderRatioMale,
        genderRatioFemale: genderRatioFemale,
        hatchSteps: hatchSteps,
        abilities: abilities,
        evs: evs,
        themeColor: themeColor
      });
    }
  }, [pokemonRes, pokeSpeciesRes]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <IconButton color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>

          <div className="title">{pokeprop.name}</div>
        </DialogTitle>
        <DialogContent>
          <img
            height="30%"
            width="30%"
            src={
              pokeprop.imageUrl + "?" + Date.now.toString("ddMMyyyyhhmmsstt")
            }
            alt="pokemon"
          />
          <div className="description">{pokeprop.description}</div>
          <hr />
          <br />
          <div className="stats">
            <div>
              HP{" "}
              <ProgressBar
                percentage={pokeprop.stats.hp}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
            <br />
            <div>
              Defense{" "}
              <ProgressBar
                percentage={pokeprop.stats.defense}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
            <br />
            <div>
              Attack{" "}
              <ProgressBar
                percentage={pokeprop.stats.attack}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
            <br />
            <div>
              Speed{" "}
              <ProgressBar
                percentage={pokeprop.stats.speed}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
            <br />
            <div>
              S.Defense{" "}
              <ProgressBar
                percentage={pokeprop.stats.specialDefense}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
            <br />
            <div>
              S.Attack{" "}
              <ProgressBar
                percentage={pokeprop.stats.specialAttack}
                backgroundColor={`#${pokeprop.themeColor}`}
              />
            </div>
          </div>

          <hr />
          <br />

          <div className="data-left">
            <div className="left">Height: {pokeprop.height}ft</div>
            <br />
            <div className="left">Weight: {pokeprop.weight}lbs</div>
            <br />
            <div className="left">Abilities: {pokeprop.abilities}</div>
            <br />
            <div className="left">EVs: {pokeprop.evs}</div>
            <br />
            <div className="left">Egg Groups: {pokeprop.eggGroups}</div>
          </div>
          <div className="data-right">
            <div className="right">Hatch Steps: {pokeprop.hatchSteps}</div>
            <br />
            <div className="right">Catch Rate: {pokeprop.catchRate}%</div>
            <br />
            <div className="right">
              Gender Ratio Male: {pokeprop.genderRatioMale}%
            </div>
            <br />
            <div className="right">
              Gender Ratio Female: {pokeprop.genderRatioFemale}%
            </div>
            <br />
            <div className="right">Types:</div>
            {pokeprop.types.map(type => {
              const all = type + " ";
              return (
                <div
                  style={{ backgroundColor: `#${pokeprop.themeColor}` }}
                  className="type"
                >
                  {all}
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
