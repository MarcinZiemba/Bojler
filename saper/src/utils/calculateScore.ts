const calculateScore = (time: number, numberOfMines: number, gridSize: number ) => {
    let score = 0;

    score = ( time * 100 - numberOfMines * 10 ) * gridSize

    return Math.round( score )
}

export default calculateScore