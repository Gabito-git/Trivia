import { useEffect, useState } from "react";

const WelcomeScreen = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const getHistory = async() => {
            const response = await fetch(
                'http://localhost:4000/api/history',{
                    method: 'get',
                    'Content-Type':'Application/json'
                }
            )

            const data = await response.json();
        }

        getHistory()
    }, [])

    return (
        <div className="welcomescreen">
            <div className="welcomescreen__history">
                <h2>Mejores concursantes</h2>
                <ul>
                    <li>Gabito $100.000.000</li>
                    <li>Dianlo $5.000.000</li>
                </ul>
            </div>
            <div className="welcomeScreen__start">
                <div className="welcomescreen__banner">
                    <h1 className="welcomescreen__title">Trivia</h1>
                    <span className="welcomescreen__subtitle">Millonaria</span>
                </div>
                <form>
                    <div className="welcomescreen__input-div">
                        <input 
                            placeholder="ingresa tu apodo"
                            className="welcomescreen__input"
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
