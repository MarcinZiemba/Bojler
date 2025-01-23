import React, { useEffect, useState } from 'react'
import "./AfterGameScreen.scss"
import Button from '../Button/Button'
import Input from '../Input/Input'
import Text from '../Text/Text'
import convertTime from '../../utils/convertTime'
import calculateScore from '../../utils/calculateScore'

interface afterGameScreenProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    setRestartGame: React.Dispatch<React.SetStateAction<boolean>>,
    victory: boolean,
    timer: number
}

const AfterGameScreen = ({ setRestartGame, victory , timer }: afterGameScreenProps) => {
  const [ gridSize, setGridSize ] = useState( 4 )
  const [ numberOfMines, setNumberOfMines ] = useState( 4 )
  const [ score, setScore ] = useState( 0 )
  const [ playerName, setPlayerName ] = useState( "" )
  const time = convertTime( timer )

  useEffect(() => {
    setGridSize( Number( localStorage.getItem( "gridSize" ) ) )
    setNumberOfMines( Number( localStorage.getItem( "numberOfMines" ) ) )
  }, [ timer, numberOfMines, gridSize ])
  
  const submitGame = () => {
    fetch("http://127.0.0.1:5000/results", {
        method: "POST",
        body: JSON.stringify({ 
            'player_name': playerName,
            'size': gridSize,
            'mines': numberOfMines,
            'time': timer,
         }),
        headers: {
            "Content-Type": "application/json"
        }            
      })
      .then(res => res.json())
      .then(res => {
        if( res.error ) {
            alert( res.error )

            return
        }
        
        document.location.pathname = "/leaderboard"
      })
  }

  return (
        <div className={ "popUpHolder" }>
            <div className="backgroundBlur" />
            <div className="afterGameScreen">
                <Text>( { gridSize } x { gridSize } )</Text>
                
                <div>
                    <Text marginRight={ true }>Time:</Text>
                    <Text>{ time.minutes }:</Text>
                    <Text>{ time.seconds }</Text>
                </div>
                <div>
                    <Text marginRight={ true }>Score: </Text>
                    <Text>{ calculateScore( timer, numberOfMines, gridSize ) }</Text>
                </div>
                <Input type="text" placeholder='Name' value={ playerName } onChange={ (e) => setPlayerName( e.currentTarget.value ) } />
                <div>
                    <Button onClick={ () => setRestartGame( true ) }>Restart</Button>
                    { victory ? <Button style={{ marginLeft: "clamp(5px, 1.2vw, 22px)" }} onClick={ () => submitGame() }>Submit</Button> : ""}
                </div>
            </div>
        </div>
    )
}

export default AfterGameScreen