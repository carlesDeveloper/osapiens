import React, { createContext, useState } from 'react'
export const FavoritesContext = createContext()

const FavoritesProvider = (props) => {
    const [favorites, setFavorites] = useState([])

    const setItemNonFavorite = (planetObject) => {
        console.log("esta quitando de favoritos al objeto: "+ planetObject.name)
        const planetName = planetObject.name
        const newFavorites = favorites.filter(f => f.name !== planetName)
        setFavorites(newFavorites)
    }
    const setItemFavorite = (planetObject) => {
        console.log("esta haciendo favorito al objeto: "+ planetObject.name)
        setFavorites([...favorites, planetObject])
        // const newFavorites = favorites.push(planetObject)
        // setFavorites(newFavorites)
    }
    return(
        <FavoritesContext.Provider
            value={{
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
            }}
        >
            {props.children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider;