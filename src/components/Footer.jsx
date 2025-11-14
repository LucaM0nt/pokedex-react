export default function Footer() {
  return (
    <footer className='bg-primary rounded-t-xl mt-20'>
      <div className='container text-primary text-md text-center py-10'>
        Copyright © {new Date().getFullYear()} - Pokédex React Project. All right reserved
      </div>
    </footer>
  )
}