import React from 'react'
import PlanetsTable from '../components/PlanetsTable'
import "../assets/css/planets.css"

function PlanetsPage() {
    

    return (
        <>
            <div className='planets__title'>Planets</div>
            <PlanetsTable />
        </>
    )
}

export default PlanetsPage;