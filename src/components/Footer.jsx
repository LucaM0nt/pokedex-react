export default function Footer() {
  return (
    <footer className='bg-primary rounded-t-xl py-15'>
      {/* Prima parte del footer con il testo */}
      <div className='container text-primary text-md text-center'>
        <p>Site design and layout by Luca Montanaro and Gloria Paita.</p>
        <a href="/privacy-policy.html" className="text-blue-400">Privacy Policy</a> - 
        <a href="/terms-of-service.html" className="text-blue-400">Terms of Service</a> - 
        <a href="/contact-us.html" className="text-blue-400">Contact us</a>
        <p>Pokémon images, names, forms, and other relevant information are the property of The Pokémon Company.</p>
      </div>

      {/* Seconda parte con il copyright e il link GitHub */}
      <div className='container text-primary text-md text-center pt-5'>
        <p>
          Copyright © {new Date().getFullYear()} - Pokédex React Project.
        </p>
        
        {/* Icona GitHub e link */}
        <div className="mt-3">
          <a 
            href="https://github.com/tuo-username" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-github text-3xl"></i> {/* Icona di GitHub */}
          </a>
        </div>
      </div>
    </footer>
  );
}