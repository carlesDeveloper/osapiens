import { useContext, useState } from 'react'
import "../assets/css/favorites.css"
import { DataContext } from '../context/DataContext';
import Card from '../components/Card';
import ModalError from '../components/ModalError';
import { DataContextValue } from '../interfaces/DataContext';
import { Planets } from '../interfaces/Planets';


function FavoritesPage() {
    const { favorites, setItemNonFavorite, isError, setIsError, msgError, setMsgError } = useContext<DataContextValue>(DataContext);
    const [clickRemoveFavorite, setClickRemoveFavorite] = useState<boolean>(false)
    const [favoriteSelected, setFavoriteSelected] = useState<string | null>(null)

    const removeFavorite = (planetName:string) => {
        setFavoriteSelected(planetName)
        setClickRemoveFavorite(true)
    }
    const cancelRemoving = () => {
        setClickRemoveFavorite(false)
        setFavoriteSelected(null)
    }

    const confirmRemoving = (planetName:string) => {
        try{
            const planetObject = favorites.filter(f => f.name === planetName)[0] as Planets
            setItemNonFavorite(planetObject)
            setClickRemoveFavorite(false)
            setFavoriteSelected(null);
        }catch(err){
            console.log(err)
            setIsError(true)
            setMsgError("The planet could not be removed from favorite list")
        }
        
    }
    

    return(
        <>  
            <div className='favorites__title'>Favorites</div>
            {favorites.length > 0 ? (
                <div className='favorites__content'>
                    {favorites.map(fav => (
                        <Card 
                            name={fav.name}
                            climate={fav.climate}
                            gravity={fav.gravity}
                            onCloseFunction={removeFavorite}
                        />
                    ))}
                </div>
                
            ): (
                <div className='favorites__empty'>
                    No favorites
                </div>
            )}
            {clickRemoveFavorite ? (
                <div className="modal__background">
                    <div className='remove__modal'>
                        <div className="removemodal__header">
                            <div className='header__text'>Remove favorite</div>
                            <button id='cancelbutton' onClick={() => cancelRemoving()}><span>&times;</span></button>
                        </div>
                        <div className='removemodal__content'>
                            <div className='removemodal__text'>Planet will be removed from favorites</div>
                            <div className='removemodal__buttons'>
                                <button id='cancelmodal' onClick={() => cancelRemoving()}>Cancel</button>
                                <button id='remove' onClick={() => confirmRemoving(favoriteSelected)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <ModalError
                isOpen={isError}
                msg={msgError}
                setIsOpen={setIsError}
                setMsgError={setMsgError} 
            />
        </>
    )
}

export default FavoritesPage;