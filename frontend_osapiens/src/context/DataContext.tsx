import React, { createContext, useState, useEffect } from 'react'
import { URL_API } from '../api/urls';
import { DataContextValue } from '../interfaces/DataContext';
import { Planets } from '../interfaces/Planets';
export const DataContext = createContext<DataContextValue>({})

const DataProvider = (props) => {
    const [data, setData] = useState<Planets[]>([]);
    const [favorites, setFavorites] = useState<Planets[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPlanets, setTotalPlanets] = useState(0)
    const planetsPerPage = 10;
    const [isError, setIsError] = useState(false)
    const [msgError, setMsgError] = useState("")

    const setItemNonFavorite = (planetObject: Planets) => {
        try {
            const planetName = planetObject.name
            const newFavorites = favorites.filter(f => f.name !== planetName)
            setFavorites(newFavorites)
        } catch (err) {
            console.log(err)
            setIsError(true)
            setMsgError("Planet could not be set as non favorite")
        }

    }
    const setItemFavorite = (planetObject: Planets) => {
        try {
            setFavorites([...favorites, planetObject])
        } catch (err) {
            console.log(err)
            setIsError(true)
            setMsgError("Planet could not be set as favorite")
        }
    }

    const getIdFromURL = (urlString: string) => {
        const parts = urlString.split("/")
        const idPart = parts[parts.length - 2]
        return idPart
    }

    useEffect(() => {
        // Función para realizar la llamada a la API
        const fetchData = async () => {
            try {
                const response = await fetch(URL_API + "planets/?page=" + currentPage);
                let jsonData = await response.json();

                const count = jsonData.count
                setTotalPlanets(count)

                jsonData = jsonData.results
                setData(jsonData);
            }
            catch (err) {
                console.log(err)
                setIsError(true)
                setMsgError("The data could not be retrieved, please try again later")

            }

        };

        fetchData();
    }, [currentPage]);

    return (
        <DataContext.Provider
            value={{
                data, setData,
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
                getIdFromURL,
                currentPage, setCurrentPage,
                planetsPerPage, totalPlanets,
                isError, setIsError,
                msgError, setMsgError
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;