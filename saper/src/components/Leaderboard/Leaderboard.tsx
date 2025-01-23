import React, { useEffect, useState } from 'react'
import "./Leaderboard.scss"
import DivBackground from '../DivBackground/DivBackground'
import Title from '../Text/Text'
import { Link } from 'react-router-dom'
import Text from "../Text/Text"
import Button from '../Button/Button'
import ButtonWraper from '../ButtonWrapper/ButtonWraper'
import calculateScore from '../../utils/calculateScore'
import convertTime from '../../utils/convertTime'

interface leaderboradDataProps {
    playerId: string,
    gridSize: number,
    numberOfMines: number, 
    playerName: string,
    time: number,
    minutes: string,
    seconds: string,
    score: number
}

interface responseDataType {
    board_size: number,
    date: Date,
    mines: number,
    player_name: string,
    result_id: number,
    time: number
}

interface LeaderboardProps extends React.HtmlHTMLAttributes<HTMLElement> {
}


const Leaderboard = ({ children, ...props }: LeaderboardProps) => {
    const [ gridSize, setGridSize ] = useState( 4 )
    const [ leaderboradData, setLeaderboradData ] = useState<leaderboradDataProps[]>( [] )

    //Get data
    useEffect(() => {
        const parsedData: leaderboradDataProps[] = [];

        fetch("http://127.0.0.1:5000/results")
             .then(res => res.json())
             .then(( data ) => {
                if( data.error ) {
                    alert( data.error )
                    return;
                }
                
                data.map( ( el: responseDataType ) => {
                    const singleParsedElement = {
                        playerId: "",
                        playerName: "",
                        gridSize: 0,
                        numberOfMines: 0, 
                        time: 0,
                        minutes: "",
                        seconds: "",
                        score: 0
                    }
                    const time = convertTime( el.time )


                    singleParsedElement.gridSize = el.board_size
                    singleParsedElement.numberOfMines = el.mines
                    singleParsedElement.time = el.time
                    singleParsedElement.minutes = time.minutes
                    singleParsedElement.seconds = time.seconds
                    singleParsedElement.playerId = String( el.result_id )
                    singleParsedElement.playerName = el.player_name
                    singleParsedElement.score = calculateScore( el.time, el.mines, el.board_size )

                    parsedData.push( singleParsedElement )
                } )
             })
             .then( () => {
                setLeaderboradData( parsedData )
             })
    },[])

    const changeGridOption = ( gridOption: number ) => {
        if( gridOption === gridSize ) return
        
        setGridSize( gridOption )
    }

    return (
        <header className="App-header" {...props}>
            <DivBackground>
                <Title >
                    Leaderboard of scores!
                </Title>
                <ButtonWraper>
                    <Button onClick={() => changeGridOption( 4 )} active={ gridSize === 4 }>4 X 4</Button>
                    <Button onClick={() => changeGridOption( 5 )} active={ gridSize === 5 }>5 X 5</Button>
                    <Button onClick={() => changeGridOption( 6 )} active={ gridSize === 6 }>6 X 6</Button>
                    <Button onClick={() => changeGridOption( 7 )} active={ gridSize === 7 }>7 X 7</Button>                                                            
                </ButtonWraper>
                <div className='dataContainer'>
                <div className="dataRow">
                                    <Text>Name</Text>
                                    <div>
                                        <Text marginRight={ true }>Time</Text>
                                    </div>    
                                    <Text marginRight={ true }>Mines</Text>
                                    <Text>Score</Text>
                                </div>                    
                    {
                        leaderboradData.map(( el ) => {
                            if( el.gridSize != gridSize) return ""

                            return (
                                <div className="dataRow" key={ el.playerId }>
                                    <Text>{ el.playerName }</Text>
                                    <div>
                                        <Text>{ el.minutes }:</Text>
                                        <Text marginRight={ true }>{ el.seconds }</Text>
                                    </div>    
                                    <Text marginRight={ true }>{ el.numberOfMines }</Text>
                                    <Text>{ el.score }</Text>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to="/">
                    <Button>Play</Button>
                </Link>
            </DivBackground>
        </header>
    )
}

export default Leaderboard