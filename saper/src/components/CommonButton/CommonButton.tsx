import React, { useEffect } from 'react'
import "./CommonButton.scss"

interface CommonButtonProps extends React.HtmlHTMLAttributes<HTMLElement> {
    beBlack: boolean,
}


const Board = ({ children, beBlack, ...props }: CommonButtonProps) => {
    useEffect(()=>{
        
    },[])

  return (
        <div className="tile"  { ...props }>
            { children } 
        </div>
    )
}

export default Board