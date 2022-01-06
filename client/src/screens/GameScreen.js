
import host from '../assets/presenter.png';
import Confirm from '../components/Confirm';
import useGame from '../hooks/useGame';

const GameScreen = () => {

    const {functions, values} = useGame();

    const {
        handleAnswerSelected,
        handleYesClick,
        handleNoClick,
        handleContinue,
        handleQuit,
    } = functions

    const {
        gameStatus,
        hostElement,
        trivia,
        questionElement,
        misterySound,
        congratsSound,
        failSound,
    } = values

    const {
        score,
        winner,
        answersLocked,
        isQuestionOnScreen,
        questionSelected
    } = gameStatus;


    return (
        <div className="gamescreen">

            <div className="gamescreen__score">$ { new Intl.NumberFormat("es-ES").format(score) }</div>

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
