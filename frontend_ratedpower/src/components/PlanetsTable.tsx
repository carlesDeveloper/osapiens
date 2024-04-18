import React, { useContext, useMemo } from 'react'
import ReactTable from './Table';
import { FavoriteIcon } from '../assets/svg/FavoriteIcon';
import { NonFavoriteIcon } from '../assets/svg/NonFavoriteIcon';
import { useNavigate } from "react-router-dom";
import { DataContext } from '../context/DataContext';
import { DataContextValue } from '../interfaces/DataContext';

interface Columns {
    accessorKey: string;
    header: string;
    enableSorting?: boolean;
    sortingFn?: string;
    cell?: any;
}

function PlanetsTable() {
    const navigate = useNavigate();
    const { favorites, setItemFavorite, setItemNonFavorite, getIdFromURL, currentPage, data } = useContext<DataContextValue>(DataContext);


    const selectElement = (e: React.MouseEvent, row: any, cell: any) => {
        // In the case the user selects on Favorites columns this function should not do anything
        if (cell.column.Header === "Favorite") return false
        const planetSelected = row.original.name
        const planetFiltered = data.filter(p => p.name === planetSelected)[0]
        const idPlanet = getIdFromURL(planetFiltered.url)

        navigate("/planets/" + idPlanet, { replace: true });
    }

    const isPlanetFavorite = (planet: string): boolean => {

        if (favorites.length === 0) return false;
        const searchPlanet = favorites.filter(f => f.name === planet)
        const assesment = searchPlanet.length === 0 ? false : true
        return assesment
    }
    const columns: Columns[] = useMemo(() => (
        [
            {
                accessorKey: 'name',
                header: "Name",
                enableSorting: false,
            },
            {
                accessorKey: 'climate',
                header: "Climate",
                enableSorting: false,
            },
            {
                accessorKey: 'diameter',
                header: "Diameter",
                sortingFn: 'alphanumeric',
            },
            {
                accessorKey: 'population',
                header: 'Population',
                sortingFn: 'alphanumeric',
            },
            {
                accessorKey: '',
                header: 'Favorite',
                cell: ({ row }) => {
                    const isFavorite = isPlanetFavorite(row.original.name)
                    return isFavorite ? <button className="favorite__button" onClick={(e) => setItemNonFavorite(row.original)}><FavoriteIcon /></button>
                        :
                        <button className="favorite__button" onClick={(e) => setItemFavorite(row.original)}><NonFavoriteIcon /></button>
                },
                enableSorting: false,// This column will sort in descending order first (default for number columns anyway)
            },
        ]
    ), [isPlanetFavorite, data])

    return (
        <>
            <div className='planets__table'>
                <ReactTable
                    data={data}
                    columns={columns}
                    onRowClick={selectElement}
                />
            </div>
        </>

    )
}

export default PlanetsTable;