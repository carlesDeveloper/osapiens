import {useContext, useMemo, useState} from 'react'
import { DataContext } from '../context/DataContext';
import { FavoriteIcon } from '../assets/svg/FavoriteIcon';
import { NonFavoriteIcon } from '../assets/svg/NonFavoriteIcon';
import "../assets/css/table.css"
import { DataContextValue } from '../interfaces/DataContext';

export interface HeaderInterface{
    accessor: string,
    label: string,
    sortable: boolean
}

export default function CustomTable({headers, data, onRowClick}){
    const [sortType, setSortType] = useState("")
    const [accessorSorting, setAccessorSorting] = useState("")
    const [extractedData, setExtractedData] = useState([])
  
    const { setItemFavorite, setItemNonFavorite, isPlanetFavorite } = useContext<DataContextValue>(DataContext);
    


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
                                        <td onClick={() => onRowClick(v.name)}>{v.name}</td>
                                        <td onClick={() => onRowClick(v.name)}>{v.climate}</td>
                                        <td onClick={() => onRowClick(v.name)}>{v.diameter}</td>
                                        <td onClick={() => onRowClick(v.name)}>{v.population}</td>
                                        <td  onClick={() => onRowClick(v.name, "favorite")}>{isPlanetFavorite(v.name) ? 
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