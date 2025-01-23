import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import Board from '../Board/Board';
import BoardRow from "../BoardRow/BoardRow"
import ButtonWraper from '../ButtonWrapper/ButtonWraper';
import Input from "../Input/Input"
import Text from "../Text/Text"

import generateBoard from "../../utils/generateBoard"
import Timer from '../Timer/Timer';
import Button from '../Button/Button';

interface mainGameProps {
  restartGame: boolean,
  setRestartGameScreen: React.Dispatch<React.SetStateAction<boolean>>
  setVictory: React.Dispatch<React.SetStateAction<boolean>>
  setRestartGame: React.Dispatch<React.SetStateAction<boolean>>
  timer: number,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
}

const MainGame = ( { restartGame, setRestartGame, setVictory, setRestartGameScreen, timer, setTimer }: mainGameProps ) => {
    const [ gridSize, setGridSize ] = useState<number>(5)
    const [ numberOfMines, setNumberOfMines ] = useState<number>(4)
    const [ boardData, setBoardData ] = useState<number[][]>([])
    const [ noMineTilesCount, setNoMineTilesCount ] = useState(0)
  
    //Tworzenie planszy
    useEffect(() => {
      setNoMineTilesCount(0)
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
        localStorage.setItem("gridSize", String( gridSize ))
        localStorage.setItem("timer", String( timer ))
        localStorage.setItem("numberOfMines", String( numberOfMines ))

        setRestartGameScreen( true )
        setVictory( true )
      }
    },[ noMineTilesCount, numberOfMines ])   

    const changeGridSize = ( nGrid: number ) => {
      setGridSize( nGrid );
      setRestartGame( true )
    }

    const changeNumberOfMines = (  e: React.ChangeEvent<HTMLInputElement> ) => {
      const newBombsAmount = Number( e.currentTarget.value )

      if( newBombsAmount < 4 || newBombsAmount > 10 + gridSize) {
        alert( `Number of bombs must be in range: 4 - ${ 6 + gridSize }` )
        return;
      }

      setNumberOfMines( newBombsAmount )
      setRestartGame( true )
    }

    return (
        <header className="App-header">
        <div>
          <Timer timer={ timer }></Timer>
          <ButtonWraper>
            <Button onClick={() => changeGridSize( 4 )} active={ gridSize === 4 }>4 x 4</Button>
            <Button onClick={() => changeGridSize( 5 )} active={ gridSize === 5 }>5 x 5</Button>
            <Button onClick={() => changeGridSize( 6 )} active={ gridSize === 6 }>6 x 6</Button>
            <Button onClick={() => changeGridSize( 7 )} active={ gridSize === 7 }>7 x 7</Button>
          </ButtonWraper>
          <div>
            <Text marginRight={ true }>Enter number of bombs:</Text>
            <Input type={ "number" } min={ 2 } max={ Math.pow( gridSize, 2 ) - gridSize } value={ numberOfMines }
                          style={ {marginTop: "clamp(0px, 0.55vw, 5px)"} } onChange={( e ) => changeNumberOfMines( e ) }/>
          </div>
        </div>
        <Board onClick={ (e) => (timer === 0 ? setTimer( -1 ) : "" )}>
          {
            Array( gridSize )
              .fill(0)
              .map(( element, rowNumber ) => ( <BoardRow rowNumber={ rowNumber } restartGame= { restartGame } rowData={ boardData[ rowNumber ] ?? 0 } /> ))
          }
        </Board>
        <Link to="/leaderboard">
          <Button style={{ marginTop: "clamp( 8px, 1.2vw, 20px )", cursor: "pointer" }}>
            Leaderboard
          </Button>
        </Link>
      </header>
    )
}

export default MainGame