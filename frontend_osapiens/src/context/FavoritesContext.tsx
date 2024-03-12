import React, { createContext, useState } from 'react'
export const FavoritesContext = createContext()

const FavoritesProvider = (props) => {
    const [favorites, setFavorites] = useState([])

    const setItemNonFavorite = (planetObject) => {
        const planetName = planetObject.name
        const newFavorites = favorites.filter(f => f.name !== planetName)
        // setFavorites(newFavorites)
    }
    const setItemFavorite = (planetObject) => {
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