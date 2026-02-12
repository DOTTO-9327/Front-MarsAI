import logo from "../../assets/StatCard.png";
import { ArrowRight } from 'lucide-react';
import ToggleButton from "./Togglebutton";

const MovieListSection = () => {

  return (
    <>  
<div className="flex gap-20">
<div>
  <img src={logo}  alt="logo" className="w-30 gap-1" /> 
</div>
<div className="flex  items-center gap-13"> 
  <p>bienvenu</p>
  <p>Jules Dupont</p>
  <p className="bg-green-200 
  text-[oklch(62.7%_0.154_149.214)] 
  px-4 
  py-1,25 
  rounded-4xl 
  font-medium 
  flex 
  items-center 
  justify-center 
  transition-all 
  hover:opacity-80 " >validé</p>
  <p>12/02/2026</p>
  <ToggleButton />
  
  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shadow-md">
    <span className="w-15 h-10  items-center justify-center flex "><ArrowRight />
    </span>
  </div>
</div>
</div>




    </>

  )
}
  

export default MovieListSection
