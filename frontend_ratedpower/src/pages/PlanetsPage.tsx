import React, { useContext } from 'react'
import PlanetsTable from '../components/PlanetsTable'
import "../assets/css/planets.css"
import Pagination from '../components/Pagination';
import { DataContext } from '../context/DataContext';
import ModalError from '../components/ModalError';
import { DataContextValue } from '../interfaces/DataContext';
import { Outlet } from 'react-router-dom';
import CustomTable from '../components/CustomTable';

function PlanetsPage() {
    const { isError, setIsError, msgError, setMsgError, currentPage, data } = useContext<DataContextValue>(DataContext);

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

    return (
        <>
            <div className="planets__section">
                <div className='planets__title'>Planets</div>
                <PlanetsTable />
                <Pagination />
                <CustomTable 
                    headers={headers}
                    data={data}
                />
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