import React, { useEffect, useState } from 'react';
import '../../styles/App.scss';
import Board from '../Board/Board';
import BoardRow from "../BoardRow/BoardRow"

import generateBoard from "../../utils/generateBoard"

function App() {
  const [ gridSize, setGridSize ] = useState<number>(5)
  const [ numberOfMines, setNumberOfMines ] = useState<number>(4)
  const [ boardData, setBoardData ] = useState<number[][]>([])
  const [ noMineTilesCount, setNoMineTilesCount ] = useState(0)

  //Twrzenie planszy
  useEffect(() => {
    generateBoard( gridSize, numberOfMines, setBoardData , true)
  },[ gridSize ])

  //Logika kliknięć na pola
  useEffect(() => {
    const allTileCovers = document.querySelectorAll<HTMLElement>("#cover")
    
    allTileCovers.forEach(( node ) => {
      if(node instanceof  HTMLElement) {
        const tileValue = node.parentElement?.textContent

        node.onclick = ( event ) => {
          node.onclick = ()=>{};

          if( tileValue === "-1" ) {
            console.log("przegrales")
            return;
          } 
          
          node.style.opacity = "0"
          setNoMineTilesCount(( prev ) =>  prev + 1 )
        }
      }
    })
  },[ boardData ])

  //Wygrana
  useEffect(() => {
    if( noMineTilesCount - numberOfMines === Math.pow( gridSize, 2 ) ){
      console.log("wygrałeś")
    }
  },[ noMineTilesCount ])

  console.log(noMineTilesCount)
  return (
    <div className="App">
      <header className="App-header">
        
        <Board>
          {
            Array( gridSize )
              .fill(0)
              .map(( element, rowNumber ) => ( <BoardRow rowNumber={ rowNumber } rowData={ boardData[ rowNumber ] ?? 0 } /> ))
          }
        </Board>
      </header>
    </div>
  );
}

export default App;
