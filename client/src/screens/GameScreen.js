import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import presenter from '../assets/presenter.png';

const initState = {
    question: '',
    answers:[],
    correctAnswer: null,
    level: 1
}

const GameScreen = () => {

    const [trivia, setTrivia] = useState( initState );
    const [gameLevel, setGameLevel] = useState(1);

    useEffect(() => {
        const getTrivia = async() => {
            const response = await fetch(
                `http://localhost:4000/api/trivias/${ gameLevel }`,
                {
                    method: 'get',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                }
            )

            const data = await response.json();
            if(!data.ok){
                return Swal.fire(
                    'Oops...', data.message, 'error'
                )
            }

            setTrivia( data.trivia )
        }

        getTrivia()
    }, [ gameLevel ])


    return (
        <div className="gamescreen">
            <div className="gamescreen__presenter-talk">
                <p>Vamos por $ 100.000</p>
                <div className="gamescreen__presenter">
                    <img src={ presenter } alt=""/>
                </div>
            </div>
            <div className="gamescreen__question">
                <p>{ trivia.question }</p>
            </div>
            <div className="gamescreen__answers">
                <div className="gamescreen__answer">
                    <p>A. { trivia.answers[0] }</p>
                </div>
                <div className="gamescreen__answer">
                    <p>B. { trivia.answers[1] }</p>
                </div>
            </div>

            <div className="gamescreen__answers">
                <div className="gamescreen__answer">
                    <p>C. { trivia.answers[2] }</p>
                </div>
                <div className="gamescreen__answer">
                    <p>D. { trivia.answers[3] }</p>
                </div>
            </div>
            
        </div>
    )
}

export default GameScreen
