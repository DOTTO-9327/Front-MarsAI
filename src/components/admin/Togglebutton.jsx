import { useId } from "react";

const Togglebutton = () => {
    const id = useId();
  return (
    <div>
        <label htmlFor={id} className="relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500">
    <input type="checkbox" id={id} className="peer sr-only" />
    <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-[inset-inline-start] peer-checked:start-6">
        
    </span>
  </label>
  </div>
  )
}

export default Togglebutton