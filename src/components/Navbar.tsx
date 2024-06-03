import { Link } from 'react-router-dom'
import { NavLinks } from '../consts/index'
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

const Navbar = () => {
    return (
        <nav className='flexBetween navbar'>
            <div className='flex-1 flexStart gap-10'>
                <Link to="/">
                    <h1>FLearn</h1>
                </Link>
                <ul className='xl:flex hidden text-small gap-7'>
                    {NavLinks.map(link => (
                        <Link to={link.href} key={link.key}>{link.text}</Link>
                    ))}
                </ul>
            </div>

            <div className='flexCenter gap-10 mr-5'>
                <div className="relative">
                    <SearchOutlined className="absolute top-3 left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <ShoppingCartOutlined className="text-gray-400 text-3xl" />
                <UserOutlined className="text-gray-400 text-3xl" />
            </div>
        </nav>
    )
}

export default Navbar