const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full bg-mars-light border border-transparent px-6 py-4 rounded-2xl font-bold text-sm text-mars-dark placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all uppercase ${className}`}
      {...props}
    />
  )
}

export default Input