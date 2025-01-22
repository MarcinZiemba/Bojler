import React, { useEffect } from 'react'
import "./BoardRow.scss"
import Tile from "../Tile/Tile"

interface BoardProps extends React.HtmlHTMLAttributes<HTMLElement> {
    rowData: number[],
    restartGame: boolean,
    rowNumber: number,
}

const Board = ({ rowData, restartGame, rowNumber, children, ...props } : BoardProps) => {
  return (
        <div className="boardRow" { ...props }>
            {
                Array( rowData.length )
                .fill(0)
                .map(( element, taleNumber ) => <Tile rowNumber={ taleNumber } key={ taleNumber }>{ restartGame ? "B)" : rowData[ taleNumber ] }</Tile> )
            }            
        </div>
    )
}

export default Board