import React, { useEffect, useState } from 'react'
import "./Tile.scss"

interface TileProps extends React.HtmlHTMLAttributes<HTMLElement> {
    rowNumber: number,
}


const Board = ({ rowNumber, children, ...props }: TileProps) => {
  const [ hideTile, setHideTile ] = useState( false )

    useEffect(() => {
        setHideTile( false )
    }, [ children, rowNumber ])

  return (
        <div className="tile" key={ rowNumber } onClick={() => setHideTile((prevSate) => hideTile ? prevSate : !prevSate )}  { ...props }>
            { children } 
            <div id='cover' className={`${hideTile ? "hideTile" : ""}`}></div>
        </div>
    )
}

export default Board