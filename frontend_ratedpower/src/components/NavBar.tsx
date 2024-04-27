import { navbarTitle } from '../constants'
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css"

function NavBar() {
    return (
        <>
            <div className='navbar'>
                <div className='navbar__title'>{navbarTitle}</div>
                <div className='navbar__links'>
                    <NavLink
                        to="/planets"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Planets
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Favorites
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default NavBar;