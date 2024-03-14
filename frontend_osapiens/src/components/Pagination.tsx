import React, { useState, useContext, useEffect } from 'react'
import { DataContext } from '../context/DataContext'

function Pagination(){
    const {totalPlanets, planetsPerPage, currentPage, setCurrentPage} = useContext(DataContext)
    const [pageNumbers, setPageNumbers] = useState([])

    const getPageNumber = (page:number) => {
        setCurrentPage(page)
    }
    const getNextPage = (currentPage:number) => {
        if(currentPage === pageNumbers[pageNumbers.length - 1]) {
            return false
        }else{
            setCurrentPage(currentPage + 1)
        }
    }

    const getPreviousPage = (currentPage:number) => {
        if(currentPage === 1) {
            return false
        }else{
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        const numberOfPages = Math.ceil(totalPlanets / planetsPerPage)
        const numbers = [];
        for (let i = 1; i <= numberOfPages; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers)
    }, [totalPlanets])
    
    return(
        <>
            <div className="pagination__section">
                <button className="control__page button__page" onClick={() => getPreviousPage(currentPage)}>Prev</button>
                {pageNumbers.length > 0 ? (
                    pageNumbers.map(page => (
                        <button 
                            className={page === currentPage ? "active__page button__page" : "page button__page"}
                            onClick={() => getPageNumber(page)}
                        >
                            {page}
                        </button>
                    ))
                ) : null}
                <button className="control__page button__page" onClick={() => getNextPage(currentPage)}>Next</button>
            </div>
        </>
    )
}

export default Pagination;