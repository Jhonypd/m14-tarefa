/** @format */

import React, { useState } from "react";
import axios from "axios";

export const PokemonCard = ({
  id,
  name,
  image,
  evolution,
  createPokemon,
  setCreatePokemon,
  updateList,
  setUpdateList,
  showToast, 
}) => {
  const [editPokemon, setEditPokemon] = useState(createPokemon ?? false);
  const [nameInput, setNameInput] = useState(name ?? "");
  const [imageUrlInput, setImageUrlInput] = useState(image ?? "");
  const [evolutionInput, setEvolutionInput] = useState(evolution?.toString() ?? "");

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleChangePokemon = async () => {
    if (!nameInput || !imageUrlInput || !evolutionInput) {
      showToast("Todos os campos são obrigatórios");
      return;
    }

    const pokemonData = {
      id: createPokemon ? generateId() : id,
      name: nameInput,
      imageUrl: imageUrlInput,
      evolution: Number(evolutionInput),
    };

    try {
      if (createPokemon) {
        await axios.post("http://localhost:4000/new-pokemon", pokemonData);
        setCreatePokemon(false);
      } else {
        await axios.put(`http://localhost:4000/update-pokemon/${id}`, pokemonData);
        setEditPokemon(false);
      }
      setUpdateList(updateList + 1);
    } catch (error) {
      showToast("Erro ao salvar o Pokémon");
      console.error("Erro ao salvar o Pokémon:", error);
    }
  };

  const handleDeletePokemon = async () => {
    try {
      await axios.delete(`http://localhost:4000/delete-pokemon/${id}`);
      setUpdateList(updateList + 1);
    } catch (error) {
      showToast("Erro ao deletar o Pokémon");
      console.error("Erro ao deletar o Pokémon:", error);
    }
  };

  return (
    <div className="pokemon-card">
      {editPokemon ? (
        <div>
          <label>
            Nome:
            <input
              type="text"
              onChange={(e) => setNameInput(e.target.value)}
              value={nameInput}
            />
          </label>
          <label>
            Url da imagem:
            <input
              type="text"
              onChange={(e) => setImageUrlInput(e.target.value)}
              value={imageUrlInput}
            />
          </label>
          <label>
            Estágio de evolução:
            <input
              type="number"
              onChange={(e) => setEvolutionInput(e.target.value)}
              value={evolutionInput}
            />
          </label>
          <button
            onClick={() =>
              createPokemon ? setCreatePokemon(false) : setEditPokemon(false)
            }>
            Cancelar
          </button>
          <button onClick={handleChangePokemon}>Confirmar</button>
        </div>
      ) : (
        <>
          <h2>{name}</h2>
          <img src={image} alt={name} />
          <h3>Estágio de evolução: {evolution}</h3>
          <button onClick={() => setEditPokemon(true)}>Alterar</button>
          <button onClick={handleDeletePokemon}>Remover</button>
        </>
      )}
    </div>
  );
};
