import React from 'react'
import "./Text.scss"

interface TitleProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    marginRight?: boolean,
}


const Title = ({ marginRight = false, children, ...props }: TitleProps) => {
  return (
        <p className={ `text ${ marginRight ? "small-margin-right" : '' } ` }  { ...props }>
            { children } 
        </p>
    )
}

export default Title