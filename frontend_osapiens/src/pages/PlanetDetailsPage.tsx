import React, { useState, useEffect, useContext } from 'react'
import PlanetsTable from '../components/PlanetsTable'
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from '../context/FavoritesContext';
import { useParams } from 'react-router-dom';
import "../assets/css/planets.css"

function PlanetDetailsPage() {
    const navigate = useNavigate();
    const { planetID } = useParams();
    const { favorites, setItemFavorite, setItemNonFavorite, getIdFromURL, data } = useContext(FavoritesContext);

    const [planetSelected, setPlanetSelected] = useState(null)
    const [isPlanetSelected, setIsPlanetSelected] = useState(false)


    useEffect(() => {

        if (!planetID) {
            setIsPlanetSelected(false)
            return false
        }
        const dataFiltered = data.filter(row => planetID === getIdFromURL(row.url))[0]
        if (dataFiltered) {
            setIsPlanetSelected(true)
            setPlanetSelected(dataFiltered)
        }

    }, [data, planetID])


    return (
        <>
            <div className="planets__section">
                <div className='planets__title'>Planets</div>
                <PlanetsTable />
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

        </>
    )
}

export default PlanetDetailsPage;