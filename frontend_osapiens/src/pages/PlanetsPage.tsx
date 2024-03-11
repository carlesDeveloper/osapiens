import React, { useState, useEffect } from 'react'
import { URL_API } from '../api/urls';
import ReactTable from '../components/Table';
import { Favorite } from '../assets/svg/favorite';
import { NonFavorite } from '../assets/svg/non_favorite';
import { useNavigate } from "react-router-dom";
import "../assets/css/planets.css"

function PlanetsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [planetSelected, setPlanetSelected] = useState(null)
    const [isPlanetSelected, setIsPlanetSelected] = useState(false)

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

    const selectElement = (e, row) => {
        const planetSelected = row.original.name
        const planetFiltered = data.filter(p => p.name === planetSelected)[0].url
        const partes = planetFiltered.split("/")
        const idPlanet = partes[partes.length - 2]
        // setPlanetSelected(planetSelected)
        navigate(idPlanet)
        // setIsPlanetSelected(true)
    }

    return (
        <>  
            <div className='planets__title'>Planets</div>
            <div className='planets__table'>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "name",
                        },
                        {
                            Header: "Climate",
                            accessor: "climate"
                        },
                        {
                            Header: "Diameter",
                            accessor: "diameter"
                        },
                        {
                            Header: "Population",
                            accessor: "population"
                        },
                        {
                            Header: 'Favorite',
                            accessor: '',
                            Cell: ({ value }) => (value ? <Favorite /> : <NonFavorite />),
                        },
                    ]}
                    onRowClick={selectElement}
                />
            </div>
        </>
    )
}

export default PlanetsPage;