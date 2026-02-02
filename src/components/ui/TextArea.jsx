import { forwardRef } from 'react';

const TextArea = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full bg-mars-light border border-transparent p-6 rounded-[1.8rem] font-semibold text-sm text-mars-dark placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all resize-none ${className}`}
      {...props}
    />
  );
});

export default TextArea;