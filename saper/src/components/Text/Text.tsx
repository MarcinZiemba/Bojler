import React from 'react'
import "./Text.scss"

interface TitleProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    marginRight?: boolean,
    darkButton?: boolean,
}


const Title = ({ darkButton = false, marginRight = false , children, ...props }: TitleProps) => {
  return (
        <p className={ `text ${ marginRight ? "small-margin-right" : "" } ${ darkButton ? "darkButton" : "" } ` }  { ...props }>
            { children } 
        </p>
    )
}

export default Title