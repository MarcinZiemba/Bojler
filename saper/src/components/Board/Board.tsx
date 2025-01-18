import React, { useEffect } from 'react'
import "./Board.scss"

interface BoardProps extends React.HtmlHTMLAttributes<HTMLElement> {
    children: React.ReactNode,
}

const Board = ({ children, ...props }: BoardProps ) => {
    useEffect(()=>{
            
    },[])
//key={`${ rowNumber }`}
  return (
        <div className="board" { ...props }>
            { children }
        </div>
    )
}

export default Board