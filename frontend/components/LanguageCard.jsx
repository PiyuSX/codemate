import { Check, X } from "lucide-react"



const LanguageCard = ({ languagesArray = [], addedLanguages = [], setAddedLanguages, removedLanguages = [], setRemovedLanguages, userLanguages}) => {

const handleLanguageClick = (language) => {
     if (userLanguages.includes(language)) {
        setRemovedLanguages([...removedLanguages, language])
        setAddedLanguages(addedLanguages.filter((lang) => lang !== language))
     } else if (addedLanguages.includes(language)) {
        setAddedLanguages(addedLanguages.filter((lang) => lang !== language))
     } else {
        setAddedLanguages([...addedLanguages, language])
     } 
}
 

  return (
    <div className="flex flex-row gap-4 cursor-pointer">
         {languagesArray.map((language, index)=> {
            return (
                <div onClick={() => handleLanguageClick(language)} key={index} className="flex items-center gap-2 bg-slate-900 p-4 rounded-lg">
                    {language}
                    {addedLanguages.includes(language) ? <Check className="text-green-500" size={20} /> : removedLanguages.includes(language) ? <X className="text-red-500" size={20} /> : null}
                </div>
            )
         })}
    </div>
  )
}

export default LanguageCard