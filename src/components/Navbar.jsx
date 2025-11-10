import { NavLink } from 'react-router-dom'
import siteRoutes from '../siteRoutes'

export default function Navbar({ className, ...props }) {
    return (
        <nav className={`flex items-center gap-3 ${className}`} {...props}>
            {siteRoutes[0].children.map(el => el.showInNav && <NavLink to={el.path}>{el.title}</NavLink>)}
        </nav>
    )
}