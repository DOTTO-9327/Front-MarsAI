import { useAuth } from '../context/AuthContext';
import logo from '../assets/StatCard.png';

const HeaderAdmin = () => {
  const { user } = useAuth();

  // On définit un titre de section dynamique selon le rôle
  const getSectionTitle = () => {
    if (user?.role === 'ADMIN') return 'Admin Management';
    if (user?.role === 'JURY') return 'Jury Dashboard';
    return 'Management';
  };

  // Sécurité pour les initiales : on vérifie que les chaines existent avant charAt
  const initials = user?.firstname && user?.lastname 
    ? `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`
    : '??';

  return (
    <div className="w-full bg-mars-light">
      <section className="flex justify-between items-center">
        <h3 className="text-light-gray font-bold text-lg tracking-[0.2em] uppercase">
          Back-office officiel
        </h3>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[#2563EB] font-bold text-[10px] uppercase tracking-wider">
              {user?.mail || 'email@festival.com'}
            </p>
          </div>
          
          <div className="h-12 w-12 overflow-hidden rounded-xl border-2 border-white shadow-sm bg-primary/10 flex items-center justify-center">
            {/* Si on a les initiales, on les affiche, sinon le logo par défaut */}
            {user?.firstname ? (
              <span className="text-primary font-black text-sm uppercase">
                {initials}
              </span>
            ) : (
              <img
                src={logo}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-accent uppercase tracking-[0.15em] font-bold text-2xl">
          {getSectionTitle()}
        </h3>
      </section>
    </div>
  );
};

export default HeaderAdmin;