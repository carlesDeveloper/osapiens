import React, { createContext, useState } from 'react'
import { DataContextValue } from '../interfaces/DataContext';
import { Planets } from '../interfaces/Planets';
export const DataContext = createContext<DataContextValue>({})

const DataProvider = (props) => {

    const [favorites, setFavorites] = useState<Planets[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    
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

    

    return (
        <DataContext.Provider
            value={{
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
                getIdFromURL,
                currentPage, setCurrentPage,
                planetsPerPage,
                isError, setIsError,
                msgError, setMsgError
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;