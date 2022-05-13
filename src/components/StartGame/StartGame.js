import React from 'react'

max_players = 8;
max_rounds = 4;

async function getCategories() {
fetch('http://localhost:4200/api/services/categories')
.then(response => response.json())
.then(data => console.log(data));
}


export const StartGame = ({open,onClose}) => {
    if (!open) return null;
    getCategories();
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
                        <span>
                        Select a Category:
                        </span>
                        <ul>
                        <li>
                            Maths
                        </li>
                        <li>
                            Astronomy
                        </li>
                        </ul>
                    </div>

                    <div>
                        <span>
                        Number of Players:
                        </span>
                        <ul>
                        <li>
                            Maths
                        </li>
                        <li>
                            Astronomy
                        </li>
                        </ul>
                    </div>

                    <div>
                        <span>
                        Number of Rounds:
                        </span>
                        <ul>
                        <li>
                            Maths
                        </li>
                        <li>
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

