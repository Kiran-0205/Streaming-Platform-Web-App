import React from "react"

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;

}

const Input: React.FC<InputProps> = ({id, onChange, value, label, type}) => {
  return (
    <div className="relative">
         <input id={id} value={value} type={type} onChange={onChange} className="block rounded-md bg-neutral-700
          px-6 pt-6 pb-1 w-full text-md text-white appearance-none focus:outline-none focus:ring-0 peer" placeholder=" "/>
         <label className="absolute text-zinc-400 text-md duration-150 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-6 
         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75
         peer-focus:-translate-y-3" htmlFor={id}>{label}</label>
    </div>
  )
}

export default Input