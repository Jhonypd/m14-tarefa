/** @format */

import React, { useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import axios from "axios";
import "./style.css";
import Toast from "./components/Toast";

const IndexPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [createPokemon, setCreatePokemon] = useState(false);
  const [updateList, setUpdateList] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 5000);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/");

        setPokemonList(data);
      } catch (error) {
        showToast("Erro ao buscar os Pokémons");
        console.error("Erro ao buscar os Pokémons:", error);
      }
    };
    fetchPokemons();
  }, [updateList]);

  return (
    <main>
      <div className="header">
        <h1>Coleção pessoal de POKÉMONS</h1>
        <button onClick={() => setCreatePokemon(true)}>Adicionar Pokémon</button>
      </div>
      {createPokemon && (
        <div className="create-card">
          <PokemonCard
            createPokemon={createPokemon}
            setCreatePokemon={setCreatePokemon}
            updateList={updateList}
            setUpdateList={setUpdateList}
            showToast={showToast}
          />
        </div>
      )}
      <div className="pokemon-container">
        {pokemonList.map(({ id, name, imageUrl, evolution }) => (
          <PokemonCard
            key={id}
            id={id}
            name={name}
            image={imageUrl}
            evolution={evolution}
            updateList={updateList}
            setUpdateList={setUpdateList}
            showToast={showToast}
          />
        ))}
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </main>
  );
};

export default IndexPage;
