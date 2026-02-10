import logo from '../assets/StatCard.png'

const HeaderAdmin = () => {
  return (
    <div>
      <section className="flex justify-between">
        <h3>Back-office officiel</h3>
        <div className="flex h-10 w-auto items-center gap-10">
          <div className="flex-col justify-between">
            <p>administrateur</p>
            <p>admin@email.com</p>
          </div>
          <div>
            <img src={logo} alt="Logo" className="w-32" />
          </div>
        </div>
      </section>
      <section className='mt-20'>
        <h3>admin management</h3>
      </section>
    </div>
  )
}

export default HeaderAdmin
