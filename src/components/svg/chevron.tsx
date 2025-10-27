import React from 'react'

interface Props{
    className?: string
}
const Chevron : React.FC<Props> = ({ className }) => {
  return (
    <svg className={`w-6 h-6 sm:h-7 sm:w-7 xl:w-8 xl:h-8 ${className || ''}`} width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20.2612" cy="20" rx="20.2612" ry="20" fill="#FEB907"/>
    <path d="M30.8127 20.9531H10.5515C9.85922 20.9531 9.28516 20.3865 9.28516 19.7031C9.28516 19.0198 9.85922 18.4531 10.5515 18.4531H30.8127C31.505 18.4531 32.079 19.0198 32.079 19.7031C32.079 20.3865 31.505 20.9531 30.8127 20.9531Z" fill="white"/>
    <path d="M20.6814 30.9531C19.9891 30.9531 19.415 30.3865 19.415 29.7031V9.70312C19.415 9.01979 19.9891 8.45312 20.6814 8.45312C21.3736 8.45312 21.9477 9.01979 21.9477 9.70312V29.7031C21.9477 30.3865 21.3736 30.9531 20.6814 30.9531Z" fill="white"/>
    </svg>

)}

export default Chevron