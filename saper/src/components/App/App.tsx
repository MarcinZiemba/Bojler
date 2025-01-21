import React, { useEffect, useState } from 'react';
import "./App.scss"

import MainGame from "../MainGame/MainGame"
import AfterGameScreen from "../AfterGameScreen/AfterGameScreen"

function App() {
  const [ restartGame, setRestartGame ] = useState(false)
  const [ restartGameScreen, setRestartGameScreen ] = useState(false)
  const [ timer, setTimer ] = useState(0)
  const [ currentInterval, setCurrentInterval ] = useState<NodeJS.Timeout>()

  useEffect(() => {
    if( restartGame ) {
      const allTileCovers = document.querySelectorAll<HTMLElement>("#cover")

      setRestartGameScreen( false )
      setTimer(0);
      setRestartGame( false )
      allTileCovers.forEach( node => {
        if( node.classList.contains("hideTile") )  node.classList.remove("hideTile")
      })
    }
  }, [ restartGame ])

  useEffect(() => {
    if(restartGame || restartGameScreen){
      clearInterval( currentInterval )
    }else if (timer === -1) {
      setTimer(1)

      let interval = setInterval(() => {
        setTimer(prevState => prevState + 1)
      }, 1000)

      setCurrentInterval( interval );
    }
  }, [ timer ])

  return (
    <div className="App">
      <MainGame setRestartGame={ setRestartGame } setRestartGameScreen={ setRestartGameScreen }
                  restartGame={ restartGame } timer={ timer } setTimer={ setTimer }/>
      {restartGameScreen ? <AfterGameScreen setRestartGame={ setRestartGame } timer={ timer }/> : ""}
    </div>
  );
}

export default App;