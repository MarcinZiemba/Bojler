import React, { useEffect, useState } from 'react'
import "./Timer.scss"
import Text from "../Text/Text"
import convertTime from '../../utils/convertTime'

interface timerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    timer: number
}

const Timer = ({ timer, ...props}: timerProps) => {
    const [ minutes, setMinutes ] = useState("")
    const [ seconds, setSeconds ] = useState("")

    useEffect(() => {
        const time = convertTime( timer )

        setMinutes( time.minutes )
        setSeconds( time.seconds )
    },[ timer ])

    return (
        <div className="timer" { ...props } >
            <Text> { minutes }:</Text>
            <Text>{ seconds }</Text>
        </div>
    )
}

export default Timer