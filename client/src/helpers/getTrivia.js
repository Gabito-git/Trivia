import Swal from 'sweetalert2';

export const getTrivia = async(level, setTrivia) => {
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