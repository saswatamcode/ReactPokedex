import React, { useState, useEffect } from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";
import PokemonModal from "../PokemonModal/PokemonModal";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function PokemonList() {
  const classes = useStyles();
  

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState();

  //modal
  const [open, setOpen] = useState(false);
  const [selectedPokemon, selectPokemon] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //pagination
  const [activeStep, setActiveStep] = useState(0);
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=801";
  const numPoke = 801;
  const numPages = Math.ceil(numPoke / 21);
  const pokemonsOnPage = pokemons.slice(activeStep * 21, activeStep * 21 + 21);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    fetch(url, {})
      .then(res => res.json())
      .then(response => {
        setPokemons(response.results);
        setIsLoading(false);
        console.log(url);
      })
      .catch(error => setErr(error));
  }, [url]);

  return (
    <div className="pokemonlist">
      <PokemonModal
        key={selectedPokemon}
        open={open}
        pokemonIndex={selectedPokemon}
        handleClose={handleClose}
      />
      {isLoading && <h1>Loading...</h1>}
      {err && <h1>Error</h1>}
      <div className={classes.root}>
        <Grid container>
          {isLoading !== true &&
            pokemonsOnPage.map(pokemon => {
              const pokemonIndex = pokemon.url.split("/")[
                pokemon.url.split("/").length - 2
              ];
              const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
              return (
                <Grid item xs>
                  <Pokemon
                    key={pokemon.name}
                    name={pokemon.name}
                    imageUrl={imageUrl}
                    onClick={() => {
                      handleClickOpen();
                      selectPokemon(pokemonIndex);
                    }}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
      <div className="pagination">
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        className="stepper"
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === numPages - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
