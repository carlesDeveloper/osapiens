import React, { createContext, useState } from 'react'
import { DataContextValue } from '../interfaces/DataContext';
import { Planets } from '../interfaces/Planets';
import { UsePlanets } from '../planets/UsePlanets';
export const DataContext = createContext<DataContextValue>({})

const DataProvider = (props) => {

    const [favorites, setFavorites] = useState<Planets[]>([])

    const [currentPage, setCurrentPage] = useState(1);
    const { data, totalPlanets } = UsePlanets(currentPage)
    
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

    const isPlanetFavorite = (planet: string): boolean => {
        if (favorites.length === 0) return false;
        const searchPlanet = favorites.filter(f => f.name === planet)
        const assesment = searchPlanet.length === 0 ? false : true
        return assesment
    }
    

    return (
        <DataContext.Provider
            value={{
                data, totalPlanets,
                favorites, setFavorites,
                setItemFavorite, setItemNonFavorite,
                getIdFromURL,
                currentPage, setCurrentPage,
                planetsPerPage,
                isError, setIsError,
                msgError, setMsgError,
                isPlanetFavorite
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider;