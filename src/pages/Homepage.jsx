
const Homepage = () => {
  return (
    <div className="min-h-screen bg-mars-dark p-8 flex flex-col justify-center items-center text-center">
      
      <h1 className="text-accent tracking-tighter">
        Mars.A.I
      </h1>

      <p className="mt-4 text-slate-400 text-xl">
        Bienvenue sur Mars.A.I
      </p>

      <button className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors">
        Entrer
      </button>

    </div>
  )
}

export default Homepage