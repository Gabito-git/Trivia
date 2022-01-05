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
    isQuestionOnScreen: false,
    questionSelected: null,
    winner: null
}

const initPresenter ={
    finishWelcome: false,
    talkYouSure: false,
}

let presTyped;
let qTyped;

const GameScreen = () => {

    const [trivia, setTrivia] = useState( initTrivia );
    const [gameStatus, setGameStatus] = useState( initGame );
    const [presenterStatus, setPresenterStatus] = useState(initPresenter);

    const { isQuestionOnScreen, level, questionSelected, score, winner } = gameStatus;

    const presenterElement = useRef(null);
    const questionElement  = useRef(null);

    useEffect(() => {
        const getTrivia = async() => {
            const response = await fetch(
                `http://localhost:4000/api/trivias/${ level }`,
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
    }, [ level ])

    useEffect(() => {
        presTyped = new Typed(presenterElement.current, {
            strings: level===1?['Bienvenido a Trivia Millonaria', 'Vamos por $100.000']:[], 
            startDelay: 300,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 500,
            showCursor: false,
            onComplete: () => { 
                setPresenterStatus( p => ({
                    ...p,
                    finishWelcome: true
                }) )
             }
          });

    }, [ level ])

    useEffect(() => {

        if(presenterStatus.finishWelcome){
            qTyped = new Typed( questionElement.current,{
                strings: [ `${ trivia.question }` ],
                startDelay: 700,
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 100,
                showCursor: false,
                onComplete: () => {
                    setGameStatus( g => ({
                        ...g,
                        isQuestionOnScreen: true
                    }))
                }
            } )
        }
        
    }, [presenterStatus])

    const handleAnswerSelected = ( number) => {
        if(isQuestionOnScreen){
            setGameStatus({
                ...gameStatus,
                questionSelected: number
            })
        }
    }

    const handleYesClick = () => {
        if( questionSelected === trivia.correctAnswer ){
            presTyped.destroy()
            presTyped = new Typed( presenterElement.current, {
                strings: ['..................','Felicitaciones'],
                startDelay: 700,
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 100,
                showCursor: false,
                onComplete: () => { setGameStatus({
                    ...gameStatus,
                    winner: trivia.correctAnswer,
                    score: '100.000',
                    questionSelected: null
                }) }
            })
        }
    }

    return (
        <div className="gamescreen">

            <div className="gamescreen__score">$ { score }</div>

            <div className="gamescreen__presenter-talk">
                <p ref={presenterElement}></p>
                <div className="gamescreen__presenter">
                    <img src={ presenter } alt=""/>
                </div>
            </div>

            <div className="gamescreen__question">
                <p ref={ questionElement }></p>
                {
                    questionSelected !== null && (
                        <div className='gamescreen__confirm animate__animated animate__fadeInUp'>
                            <h4>Estas seguro?</h4>
                            <button 
                                className='gamescreen__button gamescreen__button-si'
                                onClick={ handleYesClick }
                            >Si</button>
                            <button className= 'gamescreen__button gamescreen__button-no'>No</button>
                        </div>
                    )
                }
                
            </div>

            <div className="gamescreen__answers">
                <div 
                    style={
                        { backgroundColor: questionSelected === 0 
                            ? 'purple'
                            : 'black'}
                    }
                    className={`gamescreen__answer animate__animated ${ winner === 0? 'animate__zoomIn': ''}` }
                    onClick={() =>handleAnswerSelected(0)}
                >
                    { isQuestionOnScreen && <p>A. { trivia.answers[0] }</p>}
                </div>

                <div 
                    style={
                        { backgroundColor: questionSelected === 1 
                            ? 'purple'
                            : 'black'}
                    }
                    className={`gamescreen__answer animate__animated ${ winner === 1? 'animate__zoomIn': ''}` }
                    onClick={() =>handleAnswerSelected(1)}
                >
                { isQuestionOnScreen && <p>B. { trivia.answers[1] }</p>}
                </div>
            </div>

            <div className="gamescreen__answers">
                <div 
                    style={
                        { backgroundColor: questionSelected === 2
                            ? 'purple'
                            : 'black'}
                    }
                    className={`gamescreen__answer animate__animated ${ winner === 2? 'animate__zoomIn': ''}` }
                    onClick={() =>handleAnswerSelected(2)}
                >
                { isQuestionOnScreen && <p>C. { trivia.answers[2] }</p>}
                </div>

                <div 
                    style={
                        { backgroundColor: questionSelected === 3 
                            ? 'purple'
                            : 'black'}
                    }
                    className={`gamescreen__answer animate__animated ${ winner === 3? 'animate__zoomIn': ''}` }
                    onClick={() =>handleAnswerSelected(3)}
                >
                { isQuestionOnScreen && <p>D. { trivia.answers[3] }</p>}
                </div>
            </div>
            
        </div>
    )
}

export default GameScreen
