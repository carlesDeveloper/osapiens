import React, { createContext, useState, useEffect } from 'react'
import { URL_API } from '../api/urls';
export const FavoritesContext = createContext()

const FavoritesProvider = (props) => {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        // Función para realizar la llamada a la API
        const fetchData = async () => {
            const response = await fetch(URL_API + "planets/");
            let jsonData = await response.json();
            jsonData = jsonData.results
            setData(jsonData);
        };

        fetchData();
    }, []);

    return(
        <FavoritesContext.Provider
            value={{
                data, setData,
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