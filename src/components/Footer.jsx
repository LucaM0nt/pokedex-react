import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className='bg-primary flex flex-col gap-6 rounded-t-xl py-8 mx-12'>


      {/* Icon + Text Row */}
      <div className="flex justify-center items-center gap-6 mt-3">

        {/* Icon */}
        <a
          href="https://github.com/LucaM0nt/pokedex-react"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faGithub} className='text-gray-800 hover:text-gray-500 transition-colors duration-200' size="3x" />
        </a>
        {/* Text */}
        <div className="text-primary text-md text-center">
          <p>Site design and layout by Luca Montanaro & Gloria Paita.</p>
          <a href="/privacy-policy.html" className="text-blue-400">Privacy Policy</a> - <a href="/terms-of-service.html" className="text-blue-400">Terms of Service</a> - <a href="/contact-us.html" className="text-blue-400">Contact us</a>
        </div>
      </div>

      <hr className='w-2/3 mx-auto border-gray-300' />

      {/* Bottom Section */}
      <div className="text-slate-400 text-center">
        <p>
          Copyright © {new Date().getFullYear()} - Pokédex React Project.
        </p>
        <p>Pokémon images, names, forms, and other relevant information are the property of The Pokémon Company.</p>


      </div>
    </footer>
  );
}