
const typedOptions = ({ strings, preStringTyped = () => {}, onComplete =() => {} }) => {
    return ({
        strings,
        startDelay: 700,
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 100,
        showCursor: false,
        preStringTyped,
        onComplete
    })
}

export default typedOptions;
