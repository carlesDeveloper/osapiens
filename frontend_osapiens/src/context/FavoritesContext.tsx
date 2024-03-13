import React, { createContext, useState } from 'react'
export const FavoritesContext = createContext()

const FavoritesProvider = (props) => {
    const [favorites, setFavorites] = useState([])

    const setItemNonFavorite = (planetObject) => {
        const planetName = planetObject.name
        const newFavorites = favorites.filter(f => f.name !== planetName)
        setFavorites(newFavorites)
    }
    const setItemFavorite = (planetObject) => {
        setFavorites([...favorites, planetObject])
    }

    const getIdFromURL = (urlString:string) => {
        const parts = urlString.split("/")
        const idPart = parts[parts.length - 2]
        return idPart
    }

    return(
        <FavoritesContext.Provider
            value={{
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
                getIdFromURL
            }}
        >
            {props.children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider;