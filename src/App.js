import React, { useState, useEffect} from 'react' ;
import {getAllPokemon} from './services/pokemon';
import Card from "./components/Card";
import Navbar from './components/Navbar';
import './App.css'

function App () {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'
  

  useEffect ( () => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon (response.results);
      console.log(pokemon);

      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;

    setLoading(true)
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const   loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getAllPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonData(_pokemonData)
  };
  console.log(pokemonData);
  function tick(){
  const element =(
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )}
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  console.log(clock);
  setInterval(tick, 1000);
  return (

      <div>
     { 
       loading ? <h1>Loading...</h1> : (
         <>
         <Navbar />
         <div className="btn"> 
         <button onClick={prev}>Prev</button>
         <button onClick={next}>Next</button>
          </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
            <div className="btn"> 
         <button onClick={prev}>Prev</button>
         <button onClick={next}>Next</button>
          </div>
         </>
       )
     }
        
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
      
      </div>
      )
    };

export default App
