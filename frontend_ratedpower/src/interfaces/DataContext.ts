import { Planets } from "./Planets";

export interface DataContextValue {
    data: Planets[];
    setData: React.Dispatch<React.SetStateAction<Planets[]>>;
    favorites: Planets[];
    setFavorites: React.Dispatch<React.SetStateAction<Planets[]>>;
    setItemFavorite: (planetObject: Planets) => void;
    setItemNonFavorite: (planetObject: Planets) => void;
    getIdFromURL: (urlString: string) => string;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    planetsPerPage: number;
    totalPlanets: number;
    isError: boolean;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    msgError: string;
    setMsgError: React.Dispatch<React.SetStateAction<string>>;
    isPlanetFavorite: (planetString: string) => boolean;
}