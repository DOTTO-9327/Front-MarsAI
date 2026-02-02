import React from 'react'

const TextArea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full bg-mars-light border border-transparent p-6 rounded-[1.8rem] font-semibold text-sm text-mars-dark placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all resize-none ${className}`}
      {...props}
    />
  )
}

export default TextArea