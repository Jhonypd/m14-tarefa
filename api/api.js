/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();

const port = 4000;

app.use(cors())
app.use(bodyParser.json());

let pokemons = [];

app.get("/", (req, res) => {
  res.send(pokemons);
});

app.post("/new-pokemon", (req, res) => {
  const newPokemon = req.body;
  pokemons.push(newPokemon);
  res.status(201).json(newPokemon);
});

app.put("/update-pokemon/:id", (req, res) => {
  const { id } = req.params;
  const updatedPokemon = req.body;

  const index = pokemons.findIndex((pokemon) => pokemon.id === id);

  if (index !== -1) {
    pokemons[index] = updatedPokemon;
    res.send(updatedPokemon);
  } else {
    res.status(404).send({ message: "Pokémon não encontrado" });
  }
});


app.delete('/delete-pokemon/:id', (req, res) => {
    const { id } = req.params;
    const index = pokemons.findIndex(pokemon => pokemon.id === id);

    if (index !== -1) {
      pokemons.splice(index, 1);
      res.status(204);
    } else {
      res.status(404).send({ message: 'Pokémon não encontrado' });
    }
    
  });


  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });