import EvolutionNode from "./EvolutionNode.jsx";

export default function EvolutionChain({ tree }) {
  if (!tree) return null;

  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-lg shadow">
      <h3 className="text-xl lg:text-3xl font-semibold mb-4 text-gray-800 text-center pt-5">
        Evolution Chain
      </h3>

      <div className="flex justify-center">
        <EvolutionNode evo={tree} />
      </div>
    </div>
  );
}
