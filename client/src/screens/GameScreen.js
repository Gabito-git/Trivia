import presenter from '../assets/presenter.png'

const GameScreen = () => {
    return (
        <div className="gamescreen">
            <div className="gamescreen__presenter-talk">
                <p>Vamos por $ 100.000</p>
                <div className="gamescreen__presenter">
                    <img src={ presenter } alt=""/>
                </div>
            </div>
            <div className="gamescreen__question">
                <p>Cual es la diferencia entre doña Ramona y una marrana mona?</p>
            </div>
            <div className="gamescreen__answers">
                <div className="gamescreen__answer">
                    <p>A. No sabo nadita</p>
                </div>
                <div className="gamescreen__answer">
                    <p>B. Ni idea</p>
                </div>
            </div>

            <div className="gamescreen__answers">
                <div className="gamescreen__answer">
                    <p>C. De que me hablas viejo?</p>
                </div>
                <div className="gamescreen__answer">
                    <p>D. Uhmmmm yalas yalas!!!!</p>
                </div>
            </div>
            
        </div>
    )
}

export default GameScreen
