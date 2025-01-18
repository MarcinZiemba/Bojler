import React, { useEffect } from 'react'
import "./Tile.scss"

interface TileProps extends React.HtmlHTMLAttributes<HTMLElement> {
    rowNumber: Number,
}


const Board = ({ children, rowNumber, ...props }: TileProps) => {
    useEffect(()=>{
        
    },[])

  return (
        <div className="tile"  { ...props }>
            { children } 
            <div id='cover'></div>
        </div>
    )
}

export default Board