import { useContext, useEffect, useRef, useState } from "react";

import Typed from "typed.js";

import { GameContext } from "../context/gameContext";
import { initGame, initPresenter, initTrivia } from "../data/initStates";
import { byeStrings, newQuestionStrings, yesStrings } from "../data/strings";
import typedOptions from "../helpers/customTyped";
import { getTrivia } from "../helpers/getTrivia";

let presTyped;
let qTyped;

const useGame = () => {
    const [trivia, setTrivia] = useState( initTrivia);
    const [gameStatus, setGameStatus] = useState( initGame);
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

    const hostElement     = useRef(null);
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

    return{
        functions:{
            handleAnswerSelected,
            handleYesClick,
            handleNoClick,
            handleContinue,
            handleQuit
        },
        values:{
            gameStatus,
            hostElement,
            trivia,
            questionElement,
            misterySound,
            congratsSound,
            failSound,
        }
    }

}

export default useGame