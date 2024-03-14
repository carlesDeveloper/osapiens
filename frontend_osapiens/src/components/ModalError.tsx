import React from 'react'
import "../assets/css/modalerror.css"

function ModalError({ isOpen, setIsOpen, msg, setMsgError }) {

    const closeModal = () => {
        setIsOpen(false)
        setMsgError("")
    };

    return (
        <>
            {isOpen ? (
                <div className="modal">
                    <div className="modal__content">
                        <h2 className='error__title'>Error</h2>
                        <p>{msg}</p>
                        <button id="close__modal" onClick={() => closeModal()}>Close</button>
                    </div>
                </div>
            ) : null}

        </>
    )
}

export default ModalError;