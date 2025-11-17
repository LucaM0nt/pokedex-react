import Navbar from './Navbar'

function Header() {
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-white shadow'>
            <div className='container mx-auto py-4 flex items-center justify-between'>
                <Navbar className='ml-auto px-5' />
            </div>
        </header>
    )
}

export default Header
