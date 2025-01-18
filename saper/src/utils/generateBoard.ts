const generateBoard = ( gridSize: number, numberOfMines: number, 
                        setBoard: React.Dispatch<React.SetStateAction<number[][]>>, print: boolean = false) => {
    const result : number[][] = Array( gridSize ).fill( null ).map( () => Array( gridSize ).fill( 0 ) );

    for ( let numOfMines = numberOfMines; numOfMines > 0;) {
        const i = Math.floor( Math.random() * gridSize );
        const j = Math.floor( Math.random() * gridSize );

        if (result[i][j] === -1) continue;

        result[i][j] = -1;
        numOfMines--;
    }
      
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (result[i][j] === -1) continue;

            const left = i - 1;
            const right = i + 1;
            const top = j - 1;
            const bottom = j + 1;
            let count = 0;

            // lewy górny
            if ( left >= 0 && top >= 0 && result[left][top] === -1 ) {
                count++;
            }
            // środkowy górny
            if ( top >= 0 && result[i][top] === -1 ) {
                count++;
            }
            // prawy górny
            if ( right < gridSize && top >= 0 && result[right][top] === -1 ) {
                count++;
            }
            // lewy środkowy
            if ( left >= 0 && result[left][j] === -1 ) {
                count++;
            }
            // prawy środkowy
            if ( right < gridSize && result[right][j] === -1 ) {
                count++;
            }
            // lewy dolny
            if ( left >= 0 && bottom < gridSize && result[left][bottom] === -1 ) {
                count++;
            }
            // środkowy dolny
            if ( bottom < gridSize && result[i][bottom] === -1 ) {
                count++;
            }
            // prawy dolny
            if ( right < gridSize && bottom < gridSize && result[right][bottom] === -1) {
                count++;
            }

            result[i][j] = count;
        }
    }    

    if( print ){
        console.table( result )
    }


    setBoard( result );
}

export default generateBoard