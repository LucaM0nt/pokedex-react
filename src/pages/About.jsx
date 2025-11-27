import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Card from "../components/common/Card";

export default function About() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* About Us */}
        <Card as="section" className="mt-6 mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-gray-700 mb-6">
            We are a group of students passionate about Pokémon and web
            development. This project was created as part of a school assignment
            to explore modern web technologies such as React, APIs, and state
            management.
          </p>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">
                  GitHub
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Project Repo
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://github.com/LucaM0nt/pokedex-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    github.com/LucaM0nt/pokedex-react
                  </a>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-900">
                  Luca Montanaro
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://github.com/LucaM0nt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    github.com/LucaM0nt
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-900">
                  Gloria Paita
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://github.com/Gloria-Pi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    github.com/Gloria-Pi
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card as="section" className="mt-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gray-900">
                The Project
              </h2>
              <a
                href="https://github.com/LucaM0nt/pokedex-react"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900"
                aria-label="Open GitHub repository"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-gray-700 space-y-3">
            <p>
              This project is a web-based Pokédex: a digital encyclopedia that
              catalogues Pokémon species, their stats, abilities, evolutions,
              and other relevant data. It was built to explore modern web
              technologies while providing a useful tool for fans and
              developers.
            </p>
            <p>
              A Pokédex helps users quickly look up information about any
              Pokémon: compare stats, check evolution chains, and track
              favorites or captured Pokémon. It makes research and gameplay
              planning faster and more convenient.
            </p>
          </div>
        </Card>
        {/* Features */}
        <Card as="section" className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Browse a list of all available Pokémon.</li>
            <li>Filter Pokémon by type, ability, or other attributes.</li>
            <li>
              View a Pokémon profile preview with details such as abilities,
              evolutions, stats, and more.
            </li>
            <li>Add Pokémon to your favorites or to your captured list.</li>
            <li>
              View the trainer profile with captured and favorite Pokémon.
            </li>
          </ul>
        </Card>

        {/* PokeAPI */}
        <Card as="section" className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">PokeAPI</h2>
          <p className="text-gray-700 mb-4">
            This project uses the
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline ml-1"
            >
              PokeAPI
            </a>
            , a public API that provides detailed information about Pokémon,
            abilities, moves, and more.
          </p>
          <p className="text-gray-700 mb-4">
            You can find the official documentation here:
            <span>
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 hover:underline ml-1"
              >
                PokeAPI
              </a>
            </span>
          </p>
        </Card>

        {/* General Information */}
        <Card as="section" className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            General Information
          </h2>
          <p className="text-gray-700 mb-4">
            This is a non-commercial school project. All content is used for
            educational and development purposes. There are no commercial
            intents behind this application.
          </p>
          <p className="text-gray-700 mb-2">
            All data displayed in this application is provided by PokeAPI.
          </p>
          <p className="text-gray-700">
            Rights to all Pokémon belong to Game Freak and Nintendo.
          </p>
        </Card>
      </div>
    </div>
  );
}
