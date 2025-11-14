export default function Footer() {
  return (
    <footer className='bg-primary rounded-t-xl mt-20'>
      <div className='container text-primary text-md text-center py-20'>
        <p>Site design and layout by Luca Montanaro and Gloria Paita.</p>
        <a href="/privacy-policy.html"  className="text-blue-400" >Privacy Policy</a> - <a href="/terms-of-service.html" className="text-blue-400">Terms of Service</a> - <a href="/contact-us.html" className="text-blue-400">Contact us</a>
        <p>Pokémon images, names, forms, and other relevant information are the property of The Pokémon Company.</p>
      </div>
      <div className='container text-primary text-md text-center py-10'>
        <p>
          Copyright © {new Date().getFullYear()} - Pokédex React Project.
        </p>
      </div>
    </footer>
  )
}