import Pokedex from '../components/Pokedex'
import PokemonPreview from '../components/PokemonPreview'

export default function Homepage() {
    return (
        <div className="flex flex-col md:flex-row gap-4 h-auto">
            <div className="md:w-3/5 min-h-0">
                <Pokedex />
            </div>

            <aside className="md:w-2/5 h-auto sticky bg-amber-500">
                <PokemonPreview id={1} />
            </aside>
        </div>
    )
}
