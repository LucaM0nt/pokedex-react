import Pokedex from '../components/Pokedex'
import PokemonPreview from '../components/PokemonPreview'

export default function Homepage() {
    return (
        <div className="flex flex-col md:flex-row gap-4 h-full min-h-0">
            <div className="md:w-3/5 min-h-0 h-full flex-shrink-0">
                <Pokedex />
            </div>

            <aside className="md:w-2/5 min-h-0 h-full flex-shrink-0">
                <div className="sticky top-4">
                  <PokemonPreview id={1} />
                </div>
            </aside>
        </div>
    )
}
