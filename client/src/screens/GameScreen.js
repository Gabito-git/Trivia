import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Typed from "typed.js";

import presenter from '../assets/presenter.png';
import Confirm from '../components/Confirm';

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
    answersLocked: false,
    winner: null
}

const initPresenter ={
    finishSpeak: false,
}

let presTyped;
let qTyped;

const GameScreen = () => {

    const [trivia, setTrivia] = useState( initTrivia );
    const [gameStatus, setGameStatus] = useState( initGame );
    const [presenterStatus, setPresenterStatus] = useState(initPresenter);

    const { finishSpeak } = presenterStatus;

    const { 
        isQuestionOnScreen, 
        level, 
        questionSelected, 
        score, 
        winner,
        answersLocked } = gameStatus;

    const presenterElement = useRef(null);
    const questionElement  = useRef(null);
    const misterySound     = useRef(null);
    const congratsSound    = useRef(null);

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
        const strings = {
            1: ['Bienvenido a Trivia Millonaria', 'Vamos por $100.000'],
            2: ['Alista tu intelecto!!!', 'Vamos por $1.000.000'],
            3: ['Nada te detiene!!', 'Vamos por $5.000.000'],
            4: ['Estoy sin palabras.', 'Vamos por $25.000.000'],
            5: ['A hacer historia se dijo.', 'PREMIO MAYOR. Vamos por $100.000.000']
        }
        presTyped = new Typed(presenterElement.current, {
            strings: strings[level],
            startDelay: 300,
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 500,
            showCursor: false,
            onComplete: () => { 
                setPresenterStatus( p => ({
                    ...p,
                    finishSpeak: true
                }) )
             }
          });

    }, [ level ])

    useEffect(() => {

        if(finishSpeak){
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
        
    }, [finishSpeak])

    const handleAnswerSelected = ( number) => {
        if(isQuestionOnScreen && !answersLocked){
            setGameStatus({
                ...gameStatus,
                questionSelected: number
            })
        }
    }

    const handleYesClick = () => {

        setGameStatus({
            ...gameStatus,
            answersLocked: true
        })

        if( questionSelected === trivia.correctAnswer ){
            presTyped.destroy()
            presTyped = new Typed( presenterElement.current, {
                strings: ['Espera reviso mis datos... ^2000','Felicitaciones!!!!', '¿Continúas o tomas tu dinero?'],
                startDelay: 700,
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 100,
                showCursor: false,

                preStringTyped: (arrayPos, self) => {
                    const scoreCalc = {
                        1: '100.000',
                        2: '1.000.000',
                        3: '5.000.000',
                        4: '25.000.000',
                        5: '100.000.000'
                    }
                    if(arrayPos === 0){
                        misterySound.current.play();
                    }
                    if(arrayPos === 1){
                        congratsSound.current.play();
                        setGameStatus({
                            ...gameStatus,
                            answersLocked: true,    
                            winner: trivia.correctAnswer,
                            score: scoreCalc[level]
                        })
                    }
                },
            })
        }
    }

    const handleNoClick = () => {
        setGameStatus({
            ...gameStatus,
            questionSelected: null
        })
    }

    const handleContinue = () => {
        presTyped.destroy();
        qTyped.destroy();
        setGameStatus({
            ...gameStatus,
            level: gameStatus.level +1,
            isQuestionOnScreen: false,
            questionSelected: null,
            answersLocked: false,
            winner: null
        })

        setPresenterStatus({
            ...presenterStatus,
            finishSpeak: false
        })
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
                    questionSelected !== null && !answersLocked && (
                        <Confirm 
                            title="¿Estas seguro?"
                            affirmText="Si"
                            denyText="No"
                            onClickProceed={ handleYesClick }
                            onClickDeny={ handleNoClick }
                        />
                    )
                }

                {
                    questionSelected !== null && winner !== null && (
                        <Confirm 
                            affirmText="Continúo"
                            denyText="Me retiro"
                            onClickProceed={ handleContinue }
                        />
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
            <audio ref={ misterySound } src="https://res.cloudinary.com/dvexbstyt/video/upload/v1641431960/redoblante_oes8r5.mp3"></audio>
            <audio ref={ congratsSound } src="https://res.cloudinary.com/dvexbstyt/video/upload/v1641432416/aplauso_afpwwx.mp3"></audio>

        </div>
    )
}

export default GameScreen
