const GameScreen = () => {
    return (
        <div className="gamescreen">
            <div className="gamescreen__presenter-talk"></div>
            <div className="gamescreen__question"></div>
            <div className="gamescreen__answers-1">
                <div className="gamescreen__answer"></div>
                <div className="gamescreen__answer"></div>
            </div>

            <div className="gamescreen__answers-2">
                <div className="gamescreen__answer"></div>
                <div className="gamescreen__answer"></div>
            </div>
            <div className="gamescreen__presenter"></div>
        </div>
    )
}

export default GameScreen
