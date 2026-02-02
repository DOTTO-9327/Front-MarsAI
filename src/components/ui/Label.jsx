const Label = ({ children, className = "", ...props }) => {
  return (
    <label 
      className={`block text-[10px] font-black uppercase tracking-widest mb-2 ml-1 text-slate-500 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label