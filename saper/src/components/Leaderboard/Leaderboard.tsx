import React, { useEffect, useState } from 'react'
import "./Leaderboard.scss"
import DivBackground from '../DivBackground/DivBackground'
import Title from '../Text/Text'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

interface LeaderboardProps extends React.HtmlHTMLAttributes<HTMLElement> {
}


const Leaderboard = ({ children, ...props }: LeaderboardProps) => {
    return (
        <header className="App-header" {...props}>
            <DivBackground>
                <Title >
                    Leaderboard of scores!
                </Title>
                <Link to="/">
                    <Button>Play</Button>
                </Link>
            </DivBackground>
        </header>
    )
}

export default Leaderboard