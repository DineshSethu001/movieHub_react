import React from 'react'



const MovieCard = ({movie}) => {

    const handleError = (e)=>{
        e.target.src = '/images/no_img.png'
    }
    
  return (
    <div
            key={movie.id}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg group"
          >
            {/* Movie Image */}
            <img
            onError={handleError}
              src={`images/${movie.image}`}
              alt={movie.title}
              className="w-full h-104 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0  bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4 text-lg">
              <p className="font-semibold">{movie.title}</p>
              <p className="mt-1">{movie.genre}</p>
<p
  className={`mt-1 ${
    movie.rating > 8
      ? 'text-green-500'
      : movie.rating >= 6
      ? 'text-yellow-500'
      : 'text-red-500'
  }`}
>
  Rating: {movie.rating}
</p>
            </div>
          </div>
  )
}

export default MovieCard