export default function About() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Chi siamo */}
            <section className="mb-12">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">Chi siamo</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Siamo un gruppo di studenti appassionati di Pokémon e sviluppo web. Questo progetto è nato come parte di un progetto scolastico, con l'obiettivo di approfondire le tecnologie web moderne come React, API, e gestione dello stato.
                </p>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left font-bold text-red-800 border-b">NOME</th>
                            <th className="px-4 py-2 text-left font-bold text-red-800 border-b">GITHUB</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 font-bold text-gray-600">Luca Montanaro</td>
                            <td className="px-4 py-2 text-blue-400">
                                <a href="https://github.com/LucaM0nt" target="_blank" rel="noopener noreferrer">
                                    github.com/LucaM0nt
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-bold text-gray-600">Gloria Paita</td>
                            <td className="px-4 py-2 text-blue-400">
                                <a href="https://github.com/Gloria-Pi" target="_blank" rel="noopener noreferrer">
                                    github.com/Gloria-Pi
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Funzionalità */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Funzionalità</h2>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                    <li>Visualizza una lista di tutti i Pokémon disponibili.</li>
                    <li>Filtra i Pokémon per tipo, abilità o altre caratteristiche.</li>
                    <li>Anteprima del profilo di ciascun Pokémon, con dettagli come abilità, evoluzioni, statistiche, e altro.</li>
                    <li>Possibilità di aggiungere Pokémon ai preferiti o alla lista dei catturati.</li>
                    <li>Visualizzazione del profilo dell'allenatore, con i Pokémon catturati e preferiti.</li>
                </ul>
            </section>

            {/* PokeAPI */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">API PokeAPI</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Per realizzare questo progetto, abbiamo utilizzato la <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">PokeAPI</a>, un'API pubblica che fornisce informazioni dettagliate su tutti i Pokémon, le abilità, le mosse e molto altro.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Puoi trovare la documentazione ufficiale qui: <span>
                        <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            PokeAPI
                        </a>

                    </span>
                </p>
            </section>

            {/* Informazioni generali */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Informazioni Generali</h2>
                <p className="text-lg text-gray-700">
                    Questo è un progetto scolastico non a scopo di lucro.
                    <p>
                        Tutti i contenuti sono utilizzati per scopi educativi e di sviluppo. Non ci sono intenti commerciali dietro questa applicazione.
                    </p>
                </p>
                <br></br>
                <p className="text-lg text-gray-700">
                    Tutti i dati visualizzati in questa applicazione sono forniti da PokeAPI.
                </p>
                <p className="text-lg text-gray-700">
                    I diritti di tutti i Pokémon appartengono a Game Freak e Nintendo.
                </p>
            </section>
        </div >
    );
};