import React, { useEffect } from 'react'
import "./ButtonWraper.scss"

interface ButtonWraperProps extends React.HtmlHTMLAttributes<HTMLElement> {
    beBlack?: boolean,
}


const ButtonWraper = ({ children, beBlack = false, ...props }: ButtonWraperProps) => {
  return (
        <div className={ "buttonWraper" }  { ...props }>
            { children } 
        </div>
    )
}

export default ButtonWraper