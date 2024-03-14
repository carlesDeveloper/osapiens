import React from 'react'
import PlanetsTable from '../components/PlanetsTable'
import "../assets/css/planets.css"
import Pagination from '../components/Pagination';

function PlanetsPage() {


    return (
        <>
            <div className="planets__section">
                <div className='planets__title'>Planets</div>
                <PlanetsTable />
                <Pagination />
            </div>
        </>
    )
}

export default PlanetsPage;