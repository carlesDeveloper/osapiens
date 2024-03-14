import React, { createContext, useState, useEffect } from 'react'
import { URL_API } from '../api/urls';
export const DataContext = createContext()

const DataProvider = (props) => {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPlanets, setTotalPlanets] = useState(0)
    const planetsPerPage = 10;

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
            const response = await fetch(URL_API + "planets/?page="+currentPage);
            let jsonData = await response.json();

            const count = jsonData.count 
            setTotalPlanets(count)

            jsonData = jsonData.results
            setData(jsonData);
        };

        fetchData();
    }, [currentPage]);

    return(
        <DataContext.Provider
            value={{
                data, setData,
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
                getIdFromURL,
                currentPage, setCurrentPage,
                planetsPerPage, totalPlanets,
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;