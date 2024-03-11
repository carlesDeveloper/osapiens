import React from 'react'
import { navbarTitle } from '../constants'
import { Link } from "react-router-dom";
import "../assets/css/navbar.css"

function NavBar() {
    return(
        <>
            <div className='navbar'>
                <div className='navbar__title'>{navbarTitle}</div>
                <div className='navbar__links'>
                    <Link to="/planets">Planets</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>

            </div>
        </>
    )
}

export default NavBar;