import { Link } from 'react-router-dom'
import { NavLinks } from '../consts/index'

const Navbar = () => {
    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map(link => (
                        <Link to={link.href} key={link.key}>{link.text}</Link>
                    ))}
                </ul>
            </div>

            <div className='flex-center gap-4'>

            </div>
        </nav>
    )
}

export default Navbar