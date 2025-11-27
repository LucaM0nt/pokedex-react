import { Link } from "react-router-dom";

export default function PokedexButton({ data }) {
  return (
    <>
      <Link
        to={`/entry/${data.id}`}
        className="
        mt-9 px-5 py-3 
        bg-red-600 
        text-black 
        font-black
        border-4 border-gray-800 
        rounded-xl 
        shadow-[0_4px_0px_rgba(0,0,0,1)] 
        hover:bg-red-600 
        transition 
        active:translate-y-0.5 
        active:shadow-[0_2px_0px_rgba(0,0,0,1)]
        select-none
    "
      >
        READ MORE
      </Link>
    </>
  );
}
