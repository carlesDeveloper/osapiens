import React from 'react'
import { Planets } from '../interfaces/Planets';

interface CardProps extends Planets{
    onCloseFunction: (name: string)=> void
}

function Card({name, climate, gravity, onCloseFunction}:CardProps ) {
    return (
        <div className='card'>
            <div className='card__title'>{name}
                <button className="closebutton__card" onClick={() => onCloseFunction(name)}>
                    <span className="cerrar-icono">
                        &times;
                    </span>
                </button>
            </div>
            <div className='card__subtitle'>{climate}</div>
            <img src="imagen.jpg" alt="Image not found" className="card__image"></img>

            <div className='card__content'>
                <p>Climate: {climate}</p>
                <p>Gravity: {gravity}</p>
            </div>


        </div>
    )
}

export default Card;