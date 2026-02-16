// import { ArrowRight } from 'lucide-react'
// import ToggleButton from './Togglebutton'

// const CardMovie = ({
//   cover_image,
//   original_title,
//   submitted_at,
//   firstname,
//   lastname,
//   status,
// }) => {
//   const serverUrl = 'http://localhost:3000/'
//   const dateFormatted = new Date(submitted_at).toLocaleDateString('fr-FR')
//   return (
//     <>
//       <div className="flex gap-20">
//         <div>
//           <img
//             src={`${serverUrl}${cover_image}`}
//             alt={original_title}
//             className="w-30 gap-1 rounded-3xl"
//           />
//         </div>
//         <div className="flex items-center gap-13">
//           <p>{original_title}</p>
//           <p>
//             {firstname},{lastname}
//           </p>
//           <p className="py-1,25 flex items-center justify-center rounded-4xl bg-green-200 px-4 font-medium text-[oklch(62.7%_0.154_149.214)] transition-all hover:opacity-80">
//             {status}
//           </p>
//           <p>
//             {/* {submitted_at} */}
//             {dateFormatted}
//           </p>
//           <ToggleButton />

//           <div className="bg-primary/5 text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-md">
//             <span className="flex h-10 w-15 items-center justify-center">
//               <ArrowRight />
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CardMovie

import { ArrowRight } from 'lucide-react'
import ToggleButton from './Togglebutton'

const CardMovie = ({
  cover_image,
  original_title,
  submitted_at,
  firstname,
  lastname,
  status,
}) => {
  const serverUrl = 'http://localhost:3000/'
  const date = new Date(submitted_at).toLocaleDateString('fr-FR')

  const statusStyles = {
    VALIDÉ: 'bg-green-100 text-green-600',
    'EN ATTENTE': 'bg-orange-100 text-orange-600',
    REFUSÉ: 'bg-red-100 text-red-600',
  }

  const currentStatusStyle =
    statusStyles[status?.toUpperCase()] || 'bg-gray-100 text-gray-600'

  return (
    <div className="group grid grid-cols-6 items-center gap-4 px-4 py-2 transition-colors hover:bg-gray-50">
      <div>
        <img
          src={`${serverUrl}${cover_image}`}
          alt={original_title}
          className="h-16 w-24 rounded-2xl object-cover shadow-sm"
        />
      </div>
      <div className="text-sm leading-tight font-bold uppercase">
        {original_title}
      </div>

      <div className="flex flex-col text-sm font-bold text-gray-700">
        <span className="">{firstname}</span>
        <span className=" ">{lastname}</span>
      </div>
      <div className="flex justify-center">
        <span
          className={`rounded-full px-4 py-1 text-[10px] font-bold tracking-wider ${currentStatusStyle}`}
        >
          {status?.toUpperCase()}
        </span>
      </div>

      {/* Date */}
      <div className="text-center text-sm font-medium">{date}</div>

      {/* En avant + Action */}
      <div className="flex items-center justify-between pl-4">
        <ToggleButton />

        <button className="rounded-2xl bg-gray-100 p-3 text-gray-400 transition-all group-hover:bg-gray-200 group-hover:text-black">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default CardMovie
