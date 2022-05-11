import React from 'react'

export const StartGame = ({showModal,setShowModal}) => {
    return (
        <>
        {showModal ? <div>Modal</div> : null}
        </>
    )
}