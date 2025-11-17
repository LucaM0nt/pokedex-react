import { useGetPokemonQuery, useGetPokemonSpeciesQuery } from "../store/pokeApiSlice";
import TypeTag from "./TypeTag";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// Funzione per estrarre la catena evolutiva
const fetchEvolutionChain = async (evolutionUrl) => {
    const response = await fetch(evolutionUrl);
    const data = await response.json();

    return data;
};

const getEvolutions = (chain) => {
    let evolutions = [];
    let current = chain;

    // Iteriamo attraverso la catena evolutiva
    while (current) {
        // Aggiungiamo la specie corrente alla lista delle evoluzioni
        evolutions.push(current.species);
        // Se ci sono evoluzioni, prendiamo la prima
        current = current.evolves_to[0]; // Solo la prima evoluzione, possiamo modificarlo se vogliamo supportare rami
    }

    return evolutions;
};

// "Cleaning" globale di tutte le sequenze di caratteri non desiderati
// Funzione che fa il parsing del testo, sostituendo \n e \f
const parseText = (text) => {
    if (!text) return null;

    // Sostituisci i caratteri problematici
    let parsedText = text
        .replace(/\n/g, ' ')  // Sostituisci \n con ritorno a capo
        .replace(/\f/g, ' ')   // Sostituisci \f con uno spazio
        .replace(/POKéMON/g, 'Pokémon'); // Sostituisci POKéMON con la versione corretta

    // Ora split il testo su ogni linea, creiamo un array con JSX che React gestirà
    return parsedText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < parsedText.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));
};

export default function PokedexEntry() {
    // Otteniamo l'id del Pokémon dalla URL
    const { id } = useParams();

    // Query per i dati del Pokémon
    const { data: pokemonData, error: pokemonError, isLoading: isLoadingPokemon } = useGetPokemonQuery(id);

    // Query per i dati della specie del Pokémon
    const { data: speciesData, error: speciesError, isLoading: isLoadingSpecies } = useGetPokemonSpeciesQuery(id);

    const [evolutionChain, setEvolutionChain] = useState(null);

    // Carichiamo la catena evolutiva quando i dati della specie sono pronti
    useEffect(() => {
        if (speciesData?.evolution_chain) {
            fetchEvolutionChain(speciesData.evolution_chain.url)
                .then((data) => {
                    const evolutions = getEvolutions(data.chain); // Otteniamo solo le evoluzioni
                    console.log(evolutions);

                    setEvolutionChain(evolutions); // Salviamo le evoluzioni
                })
                .catch(console.error);
        }
    }, [speciesData]);

    // Gestione del loading
    if (isLoadingPokemon || isLoadingSpecies) {
        return (
            <div className="p-4 bg-white rounded-lg shadow">
                Loading...
            </div>
        );
    }

    // Gestione degli errori
    if (pokemonError || speciesError) {
        return (
            <div className="p-4 bg-white rounded-lg shadow text-red-600">
                Errore nel caricamento dei dati.
            </div>
        );
    }

    // Gestione del caso in cui i dati non sono disponibili
    if (!pokemonData || !speciesData) {
        return (
            <div className="p-4 bg-white rounded-lg shadow">
                Nessun dato disponibile.
            </div>
        );
    }

    const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || '';

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex flex-col items-center text-center">
                {/* Immagine del Pokémon */}
                <img
                    src={pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="w-40 h-40 object-contain mb-4"
                />

                {/* Nome e numero del Pokémon */}
                <h2 className="text-3xl font-bold capitalize">
                    #{pokemonData.id} {pokemonData.name}
                </h2>

                {/* Pokémon Types */}
                <div className="mt-4 text-sm capitalize">
                    {pokemonData.types?.map((t) => (
                        <TypeTag key={t.type.name} type={t.type.name} />
                    ))}
                </div>

                {/* Pokédex Entry */}
                <div className="mt-4 text-sm text-gray-600">
                    <h3 className="font-semibold">Pokédex Entry</h3>
                    <p>{parseText(flavorText)}</p>
                </div>

                {/* Altezza e peso */}
                <div className="mt-4 text-sm text-gray-600">
                    <div>Height: {pokemonData.height / 10} m</div>
                    <div>Weight: {pokemonData.weight / 10} kg</div>
                </div>

                {/* Statistiche */}
                <div className="mt-4">
                    <h3 className="font-semibold">Statistics</h3>
                    <ul className="mt-2 text-sm">
                        {pokemonData.stats.map((stat) => (
                            <li key={stat.stat.name} className="capitalize">
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Catena evolutiva */}
                {evolutionChain && evolutionChain.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold">Evolution Chain</h3>
                        <ul className="mt-2 text-sm">
                            {/* Mostra le evoluzioni */}
                            {evolutionChain.map((evolve) => (
                                <li key={evolve.name} className="capitalize">
                                    <a href={`/entry/${evolve.name}`} className="text-blue-500 hover:underline">
                                        {evolve.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
