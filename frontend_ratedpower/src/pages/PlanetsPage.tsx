import { useContext } from 'react'
// import PlanetsTable from '../components/PlanetsTable';
import CustomTable from '../components/CustomTable';
import "../assets/css/planets.css"
import Pagination from '../components/Pagination';
import { DataContext } from '../context/DataContext';
import ModalError from '../components/ModalError';
import { DataContextValue } from '../interfaces/DataContext';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PlanetsPage() {
    const navigate = useNavigate()
    const { isError, setIsError, msgError, setMsgError, data, getIdFromURL } = useContext<DataContextValue>(DataContext);

    const headers = [
        {
            "accessor": "name",
            "label": "Name",
            "sortable": false
        },
        {
            "accessor": "climate",
            "label": "Climate",
            "sortable": false
        },
        {
            "accessor": "diameter",
            "label": "Diameter",
            "sortable": true
        },
        {
            "accessor": "population",
            "label": "Population",
            "sortable": true
        },
        {
            "accessor": "favorites",
            "label": "Favorites",
            "sortable": false
        },
    ]

    // const selectElement = (e: React.MouseEvent, row: any, cell: any) => {
    //     // In the case the user selects on Favorites columns this function should not do anything
    //     if (cell.column.Header === "Favorite") return false
    //     const planetSelected = row.original.name
    //     const planetFiltered = data.filter(p => p.name === planetSelected)[0]
    //     const idPlanet = getIdFromURL(planetFiltered.url)

    //     navigate("/planets/" + idPlanet, { replace: true });
    // }
    const onRowClick = (planet: string, column?: string) =>{
        if(column === "Favorite") return 
        const planetSelected = planet
        const planetFiltered = data.filter(p => p.name === planetSelected)[0]
        const idPlanet = getIdFromURL(planetFiltered.url)

        navigate("/planets/" + idPlanet, { replace: true });
    }
    return (
        <>
            <div className="planets__section">
                <div className='planets__title'>Planets</div>
                <CustomTable 
                    headers={headers}
                    data={data}
                    onRowClick={onRowClick}
                />
                <Pagination />
                
            </div>
            <Outlet />
            <ModalError
                isOpen={isError}
                msg={msgError}
                setIsOpen={setIsError}
                setMsgError={setMsgError} 
            />
        </>
    )
}

export default PlanetsPage;