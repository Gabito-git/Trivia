import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Typed from "typed.js";

import presenter from '../assets/presenter.png';

const initTrivia = {
    question: '',
    answers:[],
    correctAnswer: null,
    level: 1
}

const initGame ={
    score: 0, 
    level: 1,
}

const initPresenter ={
    finishWelcome: false,
    talkYouSure: false,
}

const GameScreen = () => {

    const [trivia, setTrivia] = useState( initTrivia );
    const [gameStatus, setGameStatus] = useState( initGame );
    const [presenterStatus, setPresenterStatus] = useState(initPresenter)

    const presenterElement = useRef(null);
    const questionElement  = useRef(null);

    useEffect(() => {
        const getTrivia = async() => {
            const response = await fetch(
                `http://localhost:4000/api/trivias/${ gameStatus.level }`,
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
    }, [ gameStatus ])

    useEffect(() => {
        const typed = new Typed(presenterElement.current, {
            strings: gameStatus.level===1?['Bienvenido a Trivia Millonaria', 'Vamos por $100.000']:[], 
            startDelay: 300,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 500,
            showCursor: false,
            onComplete: (self) => { setPresenterStatus({
                ...presenterStatus,
                finishWelcome: true
            }) },
          });

          return () => {
            typed.destroy();
          };
    }, [ gameStatus ])

    useEffect(() => {

        if(presenterStatus.finishWelcome){
            const typed = new Typed( questionElement.current,{
                strings: [ `${ trivia.question }` ],
                startDelay: 700,
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 100,
                showCursor: false,
            } )
        }
        
    }, [presenterStatus])

    return (
        <div className="gamescreen">
            <div className="gamescreen__presenter-talk">
                <p ref={presenterElement}></p>
                <div className="gamescreen__presenter">
                    <img src={ presenter } alt=""/>
                </div>
            </div>
            <div className="gamescreen__question">
                <p ref={ questionElement }></p>
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
