import React, { MouseEventHandler, useEffect, useState } from 'react';

import Board from '../Board/Board';
import BoardRow from "../BoardRow/BoardRow"
import CommonButton from "../Button/Button"
import ButtonWraper from '../ButtonWrapper/ButtonWraper';
import Input from "../Input/Input"
import Text from "../Text/Text"

import generateBoard from "../../utils/generateBoard"
import Timer from '../Timer/Timer';

interface mainGameProps {
  restartGame: boolean,
  setRestartGame: React.Dispatch<React.SetStateAction<boolean>>,
  setRestartGameScreen: React.Dispatch<React.SetStateAction<boolean>>
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
}

const MainGame = ( { restartGame, setRestartGame, setRestartGameScreen, timer, setTimer }: mainGameProps ) => {
    const [ gridSize, setGridSize ] = useState<number>(5)
    const [ numberOfMines, setNumberOfMines ] = useState<number>(4)
    const [ boardData, setBoardData ] = useState<number[][]>([])
    const [ noMineTilesCount, setNoMineTilesCount ] = useState(0)
  
    //Tworzenie planszy
    useEffect(() => {
      generateBoard( gridSize, numberOfMines, setBoardData , true)
    },[ gridSize, numberOfMines, restartGame ])
  
    //Logika kliknięć na pola
    useEffect(() => {
      const allTileCovers = document.querySelectorAll<HTMLElement>("#cover")
      
      allTileCovers.forEach(( node ) => {
        if(node instanceof  HTMLElement) {
          const tileValue = node.parentElement?.textContent
  
          node.onclick = ( event ) => {
            node.onclick = ()=>{};
  
            if( tileValue === "-1" ) {
              setRestartGameScreen( true )

              console.log("przegrales")
  
              setNumberOfMines((prevState) => prevState)
  
              return;
            } 
  
            setNoMineTilesCount(( prev ) =>  prev + 1 )
          }
        }
      })
    },[ boardData ])
  
    //Wygrana
    useEffect(() => {
      if( noMineTilesCount === Math.pow( gridSize, 2 ) - numberOfMines ){
        setRestartGameScreen( true )
      }
    },[ noMineTilesCount ])   
    
    return (
        <header className="App-header">
        <div>
          <Timer timer={ timer }></Timer>
          <ButtonWraper>
            <CommonButton onClick={() => setGridSize( 4 )}>4 x 4</CommonButton>
            <CommonButton onClick={() => setGridSize( 5 )}>5 x 5</CommonButton>
            <CommonButton onClick={() => setGridSize( 6 )}>6 x 6</CommonButton>
            <CommonButton onClick={() => setGridSize( 7 )}>7 x 7</CommonButton>
          </ButtonWraper>
          <div>
            <Text marginRight={ true }>Enter number of bombs:</Text>
            <Input type={ "number" } min={ 2 } max={ Math.pow( gridSize, 2 ) - gridSize } value={ numberOfMines }
                          style={ {marginTop: "clamp(0px, 0.55vw, 5px)"} } onChange={( e ) =>  setNumberOfMines( Number( e.currentTarget.value )) }/>
          </div>
        </div>
        <Board onClick={ (e) => (timer === 0 ? setTimer( -1 ) : "" )}>
          {
            Array( gridSize )
              .fill(0)
              .map(( element, rowNumber ) => ( <BoardRow rowNumber={ rowNumber } rowData={ boardData[ rowNumber ] ?? 0 } /> ))
          }
        </Board>
      </header>
    )
}

export default MainGame