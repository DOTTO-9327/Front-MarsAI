import { ArrowRight } from 'lucide-react';
import ToggleButton from "./Togglebutton";

const MovieListSection = ({
  cover_image,
  original_title,
  submitted_at,
  firstname,
  lastname,
  status,
}) => {
const serverUrl = 'http://localhost:3000/'
  const dateFormatted = new Date(submitted_at).toLocaleDateString('fr-FR')
  return (
    <>
      <div className="flex gap-20">
        <div>
          <img
            src={`${serverUrl}${cover_image}`}
            alt={original_title}
            className="w-30 gap-1"
          />
        </div>
        <div className="flex items-center gap-13">
          <p>{original_title}</p>
          <p>
            {firstname},{lastname}
          </p>
          <p className="py-1,25 flex items-center justify-center rounded-4xl bg-green-200 px-4 font-medium text-[oklch(62.7%_0.154_149.214)] transition-all hover:opacity-80">
            {status}
          </p>
          <p>
            {/* {submitted_at} */}
            {dateFormatted}
          </p>
          <ToggleButton />

          <div className="bg-primary/5 text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-md">
            <span className="flex h-10 w-15 items-center justify-center">
              <ArrowRight />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieListSection

