import { CategoryTwoTone } from '@mui/icons-material';
import React, {useEffect,useState} from 'react'


const players = [2,3,4,5,6,7,8]
var rounds = [1,2,3,4];

export const StartGame = ({open,onClose}) => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const response = await fetch('http://localhost:4200/api/services/categories').then((resp) =>  resp.json());
            setCategory(response);
        }
    getCategories();
    }, []);

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

                    <label>Select a Category:</label>
                    <select className="dropDown" name = "category">
                        {category.map(c => (
                            <option>{c.name}</option>
                        ))}
                    </select>
                    <hr></hr>

                    <label>Select Number of Players:</label>
                    <br></br>
                    <select className="dropDown" name = "player">
                        {players.map(player => (
                            <option>{player}</option>
                        ))}
                    </select>

                    <hr></hr>

                    <label>Choose Number of Rounds:</label>
                    <br></br>
                    <select className="dropDown" name = "round">
                    {rounds.map(round => (
                            <option>{round}</option>
                        ))}
                    </select>
                    <br></br>
                    <button className="button">Start Game!</button>
                    </div>

                    <div className='joinGame'>
                        <h3>Join Game</h3>
                        <p>Enter Code:</p>
                        <input></input>
                        <button className="button">Join!</button>
                    </div>
                </div>
             </div>
           </div>
         </div>
        </>
    )
}

