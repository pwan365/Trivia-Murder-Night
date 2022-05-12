import React from 'react'

export const StartGame = ({open,onClose}) => {
    if (!open) return null;
    return (
        <>
         <div onClick={onClose} className='overlay'>
         <div
           onClick={(e) => {
             e.stopPropagation();
           }}
           className='modalContainer'
         >
           <div className='modalRight'>
             <p className='closeBtn' onClick={onClose}>
               X
             </p>
             <div className='content'>
                 <div className='createGame'>
                    <h3>Create Game</h3>
                    <div class="listbox-area">
                    <div>
                        <span id="ss_elem" class="listbox-label">
                        Select a Category:
                        </span>
                        <ul id="ss_elem_list"
                            tabindex="0"
                            role="listbox"
                            aria-labelledby="ss_elem">
                        <li id="ss_elem_Np" role="option">
                            Maths
                        </li>
                        <li id="ss_elem_Pu" role="option">
                            Astronomy
                        </li>
                        </ul>
                    </div>
                    </div>
                    <button>Start Game!</button>
                 </div>
                 <div className='joinGame'>
                    <h3>Join Game</h3>
                    <p>Enter Code:</p>
                    <input></input>
                    <button>Join!</button>
                 </div>
               
             </div>
           </div>
         </div>
       </div>
        </>
    )
}

