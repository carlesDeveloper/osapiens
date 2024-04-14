import { useState, useEffect } from 'react'
import { URL_API } from '../api/urls';
import { Planets } from '../interfaces/Planets';

export function UsePlanets(page: number){
    const [data, setData] = useState<Planets[]>([]);
    const [totalPlanets, setTotalPlanets] = useState(0)
    const [isError, setIsError] = useState(false)
    const [msgError, setMsgError] = useState("")

    useEffect(() => {
        // Función para realizar la llamada a la API
        const fetchData = async () => {
            try {
                const response = await fetch(URL_API + "planets/?page=" + page);
                let jsonData = await response.json();

                const count = jsonData.count
                setTotalPlanets(count)

                jsonData = jsonData.results
                setData(jsonData);
            }
            catch (err) {
                console.log(err)
                setIsError(true)
                setMsgError("The data could not be retrieved, please try again later")

            }

        };

        fetchData();
    }, [page]);

    return {data, totalPlanets, isError, msgError}
}