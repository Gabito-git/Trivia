const WelcomeScreen = () => {
    return (
        <div className="welcomescreen">
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
    )
}

export default WelcomeScreen
