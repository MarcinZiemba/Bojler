import React, { useEffect } from 'react'
import "./Button.scss"

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    beBlack?: boolean,
    marginRight?: boolean,
    active?: boolean
}


const Button = ({ children, beBlack = false, active = false,  marginRight = false, ...props }: ButtonProps) => {
  return (
        <button className={ `${beBlack ? "buttonBlack" : "buttonWhite"} ${ active ? "active" : ""}` }  { ...props }>
            { children } 
        </button>
    )
}

export default Button