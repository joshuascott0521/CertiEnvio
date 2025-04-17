import React from "react"

interface FloatingLabelProps {
  id: string
  label: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  className = "",
  required = false
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
        placeholder=" "
        className={`peer w-full h-9 border border-gray-300 rounded-lg px-3 pt-4 pb-0.5 text-sm focus:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-1 text-gray-500 text-xs transition-all
                    peer-placeholder-shown:top-2
                    peer-placeholder-shown:text-base
                    peer-placeholder-shown:text-gray-400
                    peer-not-placeholder-shown:font-bold
                    peer-focus:top-1
                    peer-focus:text-sm
                    peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  )
}
