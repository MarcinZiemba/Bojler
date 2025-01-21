import React, { HtmlHTMLAttributes } from 'react'
import "./Input.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = ({ children, ...props }: InputProps) => {
  return (
        <input className={ "input" }  { ...props }>
        </input>
    )
}

export default Input