import React, { useState, useEffect, useContext } from 'react'
import PlanetsTable from '../components/PlanetsTable'
import { useNavigate } from "react-router-dom";
import { DataContext } from '../context/DataContext';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import ModalError from '../components/ModalError';
import "../assets/css/planets.css"

function PlanetDetailsPage() {
    const navigate = useNavigate();
    const { planetID } = useParams();
    const { favorites, setItemFavorite, setItemNonFavorite, getIdFromURL, data, 
        isError, setIsError, msgError, setMsgError} = useContext(DataContext);

    const [planetSelected, setPlanetSelected] = useState(null)
    const [isPlanetSelected, setIsPlanetSelected] = useState(false)


    useEffect(() => {

        try{
            if (!planetID) {
                setIsPlanetSelected(false)
                return false
            }
            const dataFiltered = data.filter(row => planetID === getIdFromURL(row.url))[0]
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
            <div className="planets__section">
                <div className='planets__title'>Planets</div>
                <PlanetsTable />
                <Pagination />
            </div>
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