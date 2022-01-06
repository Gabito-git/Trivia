export const newQuestionStrings = (state) => ({
    1: [`Hola ${ state.nickname }.`,'Bienvenid@ a Trivia Millonaria', 'Vamos por $100.000'],
    2: ['Alista tu intelecto!!!', 'Vamos por $1.000.000'],
    3: ['Nada te detiene!!', 'Vamos por $5.000.000'],
    4: ['Estoy sin palabras.', 'Vamos por $25.000.000'],
    5: ['A hacer historia se dijo.', 'PREMIO MAYOR. Vamos por $100.000.000']
})

export const yesStrings = (state) => {
    return [
        [
            'Espera reviso mis datos... ^2000',
            'Felicitaciones!!!!',
            '¿Continúas o tomas tu dinero?'
        ],
        [
            'Espera reviso mis datos... ^2000',
            `Felicitaciones ${state.nickname}`,
            'Has llegado al final',
            'Hasta pronto ^1000'
        ]
    ]
}

export const byeStrings = [
    [   'Espera reviso mis datos... ^2000',
        'Lo siento mucho, te has equivocado', 
        'Has sido un concursante genial',
        'Hasta pronto!!! ^2000'
    ],
    [
        'Has sido un concursante genial.',
        'Hasta pronto!! ^2000'
    ]
]
