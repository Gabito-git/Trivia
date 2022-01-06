import { useContext, useEffect, useRef, useState } from 'react';

import Typed from "typed.js";

import host from '../assets/presenter.png';
import Confirm from '../components/Confirm';
import { GameContext } from '../context/gameContext';
import { initGame, initPresenter, initTrivia } from '../data/initStates';
import { byeStrings, newQuestionStrings, yesStrings } from '../data/strings';
import typedOptions from '../helpers/customTyped';
import { getTrivia } from '../helpers/getTrivia';

let presTyped;
let qTyped;

const GameScreen = () => {

    const [trivia, setTrivia] = useState( initTrivia );
    const [gameStatus, setGameStatus] = useState( initGame );
    const [hostStatus, setHostStatus] = useState(initPresenter);
    const { state, dispatch } = useContext(GameContext);

    const { finishSpeak } = hostStatus;

    const { 
        isQuestionOnScreen, 
        level, 
        questionSelected, 
        score, 
        winner,
        answersLocked } = gameStatus;

    const hostElement = useRef(null);
    const questionElement  = useRef(null);
    const misterySound     = useRef(null);
    const congratsSound    = useRef(null);
    const failSound        = useRef(null);

    useEffect(() => {
        getTrivia(level, setTrivia)
    }, [ level ])

    useEffect(() => {
        presTyped = new Typed(
            hostElement.current, 
            typedOptions({
                strings: newQuestionStrings(state)[level],
                onComplete: () => {
                    setHostStatus( p => ({
                        ...p,
                        finishSpeak:true
                    }))
                }
            })
        )

    }, [ level ])

    useEffect(() => {
        if(finishSpeak){
            qTyped = new Typed(
                questionElement.current,
                typedOptions({
                    strings: [`${ trivia.question }`],
                    onComplete: () => {
                        setGameStatus( g => ({
                            ...g,
                            isQuestionOnScreen: true
                        }))
                    }
                })
            )
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

        level < 5 && setGameStatus({
            ...gameStatus,
            answersLocked: true
        })

        if( questionSelected === trivia.correctAnswer ){
            presTyped.destroy()
            presTyped = new Typed(
                hostElement.current,
                typedOptions({
                    strings: level === 5 ? yesStrings(state)[1]: yesStrings(state)[0],
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
                                winner: level !== 5? trivia.correctAnswer: null,
                                score: scoreCalc[level]
                            })
                        }
                    },
                    onComplete: () => {
                        if (level === 5){
                            handleQuit()
                        }
                    }
                })
            )
          
        } else{
            presTyped.destroy();
            handleQuit(true);
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

        setHostStatus({
            ...hostStatus,
            finishSpeak: false
        })
    }

    const handleQuit = (mistake) => {
        presTyped.destroy();
        const quit = async() => {
            level !== 5 && presTyped.destroy();
            qTyped.destroy();
            setHostStatus(initPresenter);
            setGameStatus(initGame);
            setTrivia(initTrivia);

            (level > 1 || !mistake) && await fetch(
                'http://localhost:4000/api/history',{
                    method: 'post',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: state.nickname,
                        score: level !==5 ?`$ ${score}`: '$ 100.000.000'
                    })
                }
            )
            dispatch({
                type: 'UNSET_NICKNAME'
            })
        }

        presTyped = level === 5? 'undefined' : new Typed(
            hostElement.current,
            typedOptions({
                strings: mistake ? byeStrings[0]: byeStrings[1], 
                preStringTyped: (arrayPos) => {
                    if( mistake && arrayPos === 0){
                        misterySound.current.play();
                    }else if(arrayPos === 1){
                        failSound.current.play();
                    }
                },
                onComplete: () => {
                    quit();
                }
            })
        )

        level === 5 && quit()
    }

    return (
        <div className="gamescreen">

            <div className="gamescreen__score">$ { score }</div>

            <div className="gamescreen__presenter-talk">
                <p ref={hostElement}></p>
                <div className="gamescreen__presenter">
                    <img src={ host } alt=""/>
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
                            onClickDeny={() => handleQuit(false) }
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
                    className={
                        `gamescreen__answer animate__animated 
                        ${ winner === 0? 'animate__zoomIn': ''}` 
                    }
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
                    className={
                        `gamescreen__answer animate__animated 
                        ${ winner === 1? 'animate__zoomIn': ''}` 
                    }
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
                    className={
                        `gamescreen__answer animate__animated 
                        ${ winner === 2? 'animate__zoomIn': ''}` 
                    }
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
                    className={
                        `gamescreen__answer animate__animated 
                        ${ winner === 3? 'animate__zoomIn': ''}` 
                    }
                    onClick={() =>handleAnswerSelected(3)}
                >
                { isQuestionOnScreen && <p>D. { trivia.answers[3] }</p>}
                </div>
            </div>
            <audio ref={ misterySound } src="https://res.cloudinary.com/dvexbstyt/video/upload/v1641431960/redoblante_oes8r5.mp3"></audio>
            <audio ref={ congratsSound } src="https://res.cloudinary.com/dvexbstyt/video/upload/v1641432416/aplauso_afpwwx.mp3"></audio>
            <audio ref={ failSound } src="https://res.cloudinary.com/dvexbstyt/video/upload/v1641483459/fail-trombone-01_aelihv.mp3"></audio>

        </div>
    )
}

export default GameScreen
