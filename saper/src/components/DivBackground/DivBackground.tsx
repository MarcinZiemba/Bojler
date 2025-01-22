import React, { useEffect, useState } from 'react'
import "./DivBackground.scss"

interface DivBackgroundProps extends React.HtmlHTMLAttributes<HTMLElement> {
}


const DivBackground = ({ children, ...props }: DivBackgroundProps) => {
    return (
        <div className="opacityBackground" {...props}>
            { children }
        </div>
    )
}

export default DivBackground