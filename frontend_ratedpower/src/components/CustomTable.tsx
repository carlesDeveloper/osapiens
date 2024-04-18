import React, {useContext, useEffect, useMemo, useState} from 'react'
import { DataContext } from '../context/DataContext';
import { FavoriteIcon } from '../assets/svg/FavoriteIcon';
import { NonFavoriteIcon } from '../assets/svg/NonFavoriteIcon';
import "../assets/css/table.css"

export default function CustomTable({headers, data}){
    const [sortType, setSortType] = useState("")
    const [accessorSorting, setAccessorSorting] = useState("")
    const [extractedData, setExtractedData] = useState([])
  
    const { favorites, setItemFavorite, setItemNonFavorite, getIdFromURL, currentPage, isPlanetFavorite } = useContext<DataContextValue>(DataContext);
    


    useMemo(() => {
        const extractedProperties = data.map(({name, climate, diameter, population}) => {
            return { name, climate, diameter, population }; // Select only the desired properties
        });
        
        setExtractedData(extractedProperties)
    },[data])

    const handleSorting = (accessor: string, sortable: boolean) => {
        if (!sortable) return false
        const sortOrder = accessor === accessorSorting && sortType === "asc" ? "desc" : "asc"
        setSortType(sortOrder)
        setAccessorSorting(accessor)
        sortData(extractedData, accessor, sortOrder)
    }
    
    const sortData = (extractedData, accessor, order) => {
        if(order === "asc"){
            extractedData.sort((a,b) => {return (b[accessor] - a[accessor])})
        }else{
            extractedData.sort((a,b) => {return (a[accessor] - b[accessor])})
        }
        setExtractedData(extractedData)
    }

    return(
        <>
            <div className="customtable">
                <table>
                    <thead>
                        {headers.map(({accessor, label, sortable}) => 

                            <th key={accessor} onClick={() => handleSorting(accessor, sortable)}>
                                {label}
                                {accessorSorting === accessor ? (
                                    sortType === "asc" ? ' ↑' : ' ↓'
                                ) : null}
                            </th>
                        )}
                    </thead>
                    <tbody>
                        
                            {extractedData.length > 1 ?
                            (Object.values(extractedData).map(v => 
                                <>
                                    <tr key={v.name}>
                                        <td>{v.name}</td>
                                        <td>{v.climate}</td>
                                        <td>{v.diameter}</td>
                                        <td>{v.population}</td>
                                        <td>{isPlanetFavorite(v.name) ? 
                                            <button className="favorite__button" onClick={() => setItemNonFavorite(v)}><FavoriteIcon /></button> 
                                        : 
                                            <button className="favorite__button" onClick={() => setItemFavorite(v)}><NonFavoriteIcon /></button>}
                                        </td>
                                    </tr>
                                </>                          
                            )) : null}
                    </tbody>
                </table>
            </div>
        </>
    )
}