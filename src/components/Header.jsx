import Navbar from './Navbar'

function Header() {

    return (
        <header className='flex items-center justify-between container'>
            <Navbar className='ml-auto px-5' />
        </header>
    )
}

export default Header
