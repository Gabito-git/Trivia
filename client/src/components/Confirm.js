const Confirm = ({ title, onClickProceed, onClickDeny, affirmText, denyText }) => {
    return (
        <div className='confirm__confirm animate__animated animate__fadeInUp'>
            <h4>{ title }</h4>
            <button 
                className='confirm__button confirm__button-si'
                onClick={ onClickProceed }
            >{ affirmText }</button>
            <button 
                className= 'confirm__button confirm__button-no'
                onClick={ onClickDeny }
            >{ denyText }</button>
        </div>
    )
}

export default Confirm
