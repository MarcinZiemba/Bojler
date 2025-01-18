import React, { useEffect } from 'react'
import "./BoardRow.scss"
import Tile from "../Tile/Tile"

interface BoardProps extends React.HtmlHTMLAttributes<HTMLElement> {
    rowData: number[],
    rowNumber: number,
}

const Board = ({ rowData, rowNumber, children, ...props } : BoardProps) => {
    useEffect(()=>{
        
    },[])

  return (
        <div className="boardRow" { ...props }>
            {
                Array( rowData.length )
                .fill(0)
                .map(( element, taleNumber ) => <Tile rowNumber={ taleNumber }>{ rowData[ taleNumber ] }</Tile> )
            }            
        </div>
    )
}

export default Board