import React from 'react'

const NormalLanguageCard = ({languagesArray}) => {
  return (
    <div className="flex flex-row gap-4 ">
         {languagesArray.map((language, index)=> {
            return (
                <div key={index} className="flex items-center gap-2 bg-slate-900 p-4 rounded-lg">
                    {language}
                   
                </div>
            )
         })}
    </div>
  )
}

export default NormalLanguageCard





