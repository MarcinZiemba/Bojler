import React from 'react'
import "./AfterGameScreen.scss"
import Button from '../Button/Button'
import Input from '../Input/Input'
import Text from '../Text/Text'
import convertTime from '../../utils/convertTime'

interface afterGameScreenProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    setRestartGame: React.Dispatch<React.SetStateAction<boolean>>,
    timer: number
}

const AfterGameScreen = ({ setRestartGame, timer }: afterGameScreenProps) => {
  const time = convertTime(timer)

  return (
        <div className={ "popUpHolder" }>
            <div className="backgroundBlur" />
            <div className="afterGameScreen">
                <Text>Your time ( 4 x 4 )</Text>
                <div>
                    <Text>{ time.minutes }:</Text>
                    <Text>{ time.seconds }</Text>
                </div>
                <Input type="text" placeholder='Name'/>
                <div>
                    <Button onClick={ () => setRestartGame(true) }>Restart</Button>
                    <Button style={{ marginLeft: "clamp(5px, 1.2vw, 22px)" }}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default AfterGameScreen