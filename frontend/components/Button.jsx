//my own version of button
import Link from 'next/link'

import React from 'react'

const Button = ({style, link, onclick, text, primary, secondary }) => {

    let buttonStyle = `
    text-xl font-medium px-6 py-3 rounded-xl
    transition-all duration-200
    ${primary ? 'bg-indigo-500 text-white hover:bg-indigo-600' : ''}
    ${secondary ? 'bg-gray-200 text-slate-950 hover:bg-white' : ''}
    ${style}
  `


  if (link) {
    return (
        <Link href={link} className={buttonStyle}>
           {text}
        </Link>
    )
  }

  if (onclick) {
    return (
        <button onClick={onclick} className={buttonStyle}>
            {text}
        </button>
    )
  }
}

export default Button