import React, { useContext, useState } from 'react'
import "../assets/css/favorites.css"
import { FavoritesContext } from '../context/FavoritesContext';


function FavoritesPage() {
    const { favorites, setItemNonFavorite } = useContext(FavoritesContext);
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
                        <div className='card'>
                            <div className='card__title'>{fav.name}
                                <button className="closebutton__card" onClick={() => removeFavorite(fav.name)}>
                                    <span className="cerrar-icono">
                                        &times;
                                    </span>
                                </button>
                            </div>
                            <div className='card__subtitle'>{fav.climate}</div>
                            <img src="imagen.jpg" alt="Image not found" className="card__image"></img>
                            
                            <div className='card__content'>
                                <p>Climate: {fav.climate}</p>
                                <p>Gravity: {fav.gravity}</p>
                            </div>
                            

                        </div>
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