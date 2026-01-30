import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  icon: Icon, 
  type = 'button',
  ...props 
}) => {
  
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 rounded-full font-black uppercase tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#246BAD] text-white hover:bg-[#1d568c] shadow-xl shadow-[#246BAD]/20 hover:shadow-[#246BAD]/40 hover:-translate-y-1",
    accent: "bg-[#FF5845] text-white hover:bg-[#e44d3d] shadow-xl shadow-[#FF5845]/20 hover:shadow-[#FF5845]/40 hover:-translate-y-1",
    secondary: "bg-[#F2F3F5] text-[#282828] hover:bg-white shadow-sm hover:shadow-md",
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/10"
  };

  const sizeStyles = "px-8 py-4 text-sm md:text-base";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizeStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

export default Button;