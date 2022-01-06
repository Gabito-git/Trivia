import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GameContext } from "../context/gameContext";

const WelcomeScreen = () => {

    const [history, setHistory] = useState([]);
    const [nickname, setNickname] = useState('');
    const { dispatch } = useContext(GameContext);

    useEffect(() => {
        const getHistory = async() => {
            const response = await fetch(
                'http://localhost:4000/api/history',{
                    method: 'get',
                    'Content-Type':'Application/json'
                }
            )

            const data = await response.json();
            setHistory(data.history)
        }

        getHistory()
    }, [])

    const handleStart = (e) => {
        e.preventDefault();

        if( !nickname.trim() ){
            return Swal.fire(
                'Oops.', 'Por favor ingresa un nickname', 'error'
            )
        }

        dispatch({
            type: 'ADD_NICKNAME',
            payload: nickname
        })

    }

    return (
        <div className="welcomescreen">
            <div className="welcomescreen__history">
                <h2>Mejores concursantes</h2>
                <ul>
                    {
                        history.length === 0 
                            ? <p>Se el primero</p>
                            : (
                                history.map( ({username, score}) => (
                                    <li>{username}  {score}</li>
                                ) )
                            )
                    }
                </ul>
            </div>
            <div className="welcomeScreen__start">
                <div className="welcomescreen__banner">
                    <h1 className="welcomescreen__title">Trivia</h1>
                    <span className="welcomescreen__subtitle">Millonaria</span>
                </div>
                <form onSubmit={ handleStart }>
                    <div className="welcomescreen__input-div">
                        <input 
                            placeholder="ingresa tu apodo"
                            className="welcomescreen__input"
                            value={ nickname }
                            onChange={ (e) => setNickname(e.target.value) }
                        />
                    </div>
                    <div className="welcomescreen__button-div">
                        <button className="welcomescreen__button">Iniciar</button>
                    </div>
                </form> 

            </div>
                       
        </div>
    )
}

export default WelcomeScreen
