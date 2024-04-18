import React, { useState, useEffect, useContext } from 'react'
import PlanetsTable from '../components/PlanetsTable'
import { DataContext } from '../context/DataContext';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import ModalError from '../components/ModalError';
import "../assets/css/planets.css"
import { DataContextValue } from '../interfaces/DataContext';
import { Planets } from '../interfaces/Planets';

interface Params {
    planetID: string;
}

function PlanetDetailsPage() {
    const { planetID } = useParams<Params>();
    const { getIdFromURL, data,
        isError, setIsError, msgError, setMsgError, currentPage} = useContext<DataContextValue>(DataContext);
    

    const [planetSelected, setPlanetSelected] = useState<Planets | null>(null)
    const [isPlanetSelected, setIsPlanetSelected] = useState<boolean>(false)


    useEffect(() => {

        try{
            if (!planetID) {
                setIsPlanetSelected(false)
                return false
            }
            const dataFiltered = data.filter((row: Planets) => planetID === getIdFromURL(row.url))[0]
            if (dataFiltered) {
                setIsPlanetSelected(true)
                setPlanetSelected(dataFiltered)
            }
        }catch(err){
            console.log(err)
            setIsError(true)
            setMsgError("The planet details could not be retrieved, try again later")
        }
        

    }, [data, planetID])


    return (
        <>
            {(isPlanetSelected && planetSelected !== null) ? (
                <div className="planetdetails">
                    <div className="planetname">{planetSelected.name}</div>
                    <div className="additionaldetails">
                        <div className="climatedetails">Climate: {planetSelected.climate}</div>
                        <div className="grafitydetails">Gravity: {planetSelected.gravity}</div>
                    </div>
                </div>
            ) : null}
            <ModalError
                isOpen={isError}
                msg={msgError}
                setIsOpen={setIsError}
                setMsgError={setMsgError} 
            />

        </>
    )
}

export default PlanetDetailsPage;