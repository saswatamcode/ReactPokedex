import React from "react";
import "./App.css";
import PokemonList from "./components/PokemonList/PokemonList";
import Header from "./layout/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <PokemonList />
    </div>
  );
}

export default App;
