import React, { useContext, useState } from 'react'
import "../assets/css/favorites.css"
import { DataContext } from '../context/DataContext';
import Card from '../components/Card';


function FavoritesPage() {
    const { favorites, setItemNonFavorite } = useContext(DataContext);
    const [clickRemoveFavorite, setClickRemoveFavorite] = useState(false)
    const [favoriteSelected, setFavoriteSelected] = useState()

    const removeFavorite = (planetName:string) => {
        setFavoriteSelected(planetName)
        setClickRemoveFavorite(true)
    }
    const cancelRemoving = () => {
        setClickRemoveFavorite(false)
    }

    const confirmRemoving = (planetName:string) => {
        const planetObject = favorites.filter(f => f.name === planetName)[0]
        setItemNonFavorite(planetObject)
        setClickRemoveFavorite(false)
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
                                <button id='remove' onClick={(e) => confirmRemoving(favoriteSelected)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            
        </>
    )
}

export default FavoritesPage;