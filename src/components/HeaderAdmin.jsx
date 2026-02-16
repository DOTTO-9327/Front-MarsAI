import logo from '../assets/StatCard.png'

const HeaderAdmin = () => {
  return (
    <div className="w-full bg-mars-light">

      <section className="flex justify-between items-center">
        <h3 className="text-light-gray font-bold text-lg tracking-[0.2em] uppercase">
          Back-office officiel
        </h3>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-md uppercase tracking-tight text-mars-dark">
              Administrateur
            </p>
            <p className="text-[#2563EB] font-bold text-xs">
              admin@email.com
            </p>
          </div>
          <div className="h-12 w-12 overflow-hidden rounded-xl border-2 border-white shadow-sm">
            <img
              src={logo}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-accent uppercase tracking-[0.15em] font-bold text-2xl">
          Admin Management
        </h3>
      </section>

    </div>
  )
}

export default HeaderAdmin