import React, { useEffect } from 'react'
import "./Button.scss"

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    beBlack?: boolean,
    marginRight?: boolean,
}


const Button = ({ children, beBlack = false, marginRight = false, ...props }: ButtonProps) => {
  return (
        <button className={ `${beBlack ? "buttonBlack" : "buttonWhite"}` }  { ...props }>
            { children } 
        </button>
    )
}

export default Button