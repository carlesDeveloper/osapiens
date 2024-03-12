import React, { useState, useEffect, useContext } from 'react'
import { URL_API } from '../api/urls';
import ReactTable from '../components/Table';
import { FavoriteIcon } from '../assets/svg/FavoriteIcon';
import { NonFavoriteIcon } from '../assets/svg/NonFavoriteIcon';
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from '../context/FavoritesContext';
import "../assets/css/planets.css"

function PlanetsPage() {
    const navigate = useNavigate();
    const { favorites, setItemFavorite, setItemNonFavorite } = useContext(FavoritesContext);

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

    const isPlanetFavorite = (planet:string):boolean => {
        
        if(favorites.length === 0) return false;
        const searchPlanet = favorites.filter(f => f.name === planet)
        debugger;
        const assesment = searchPlanet.length === 0 ? false : true
        console.log(assesment)
        return assesment
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
                            Cell: (Cell) => {
                                const isFavorite = isPlanetFavorite(Cell.row.original.name)
                                return isFavorite ? <FavoriteIcon 
                                                         onClickFunction={setItemNonFavorite(Cell.row.original)} 
                                                    /> : 
                                                    <NonFavoriteIcon 
                                                        onClickFunction={setItemFavorite(Cell.row.original)} 
                                                    />
                            },
                        },
                    ]}
                    onRowClick={selectElement}
                />
            </div>
        </>
    )
}

export default PlanetsPage;