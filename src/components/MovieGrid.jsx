import React, { useEffect, useState } from 'react';
import { CiGrid42 } from "react-icons/ci";
import { MdLocationSearching } from "react-icons/md";
import MovieCard from './MovieCard';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  // Fetch movies
  useEffect(() => {
    fetch('/movies.json') // Make sure this path is correct
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error loading movies:", err));
  }, []);

  // Filter helper functions
  const matchesGenre = (movie, genre) => {
    return genre === "All Genres" || movie.genre?.toLowerCase() === genre.toLowerCase();
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    return (
      rating === "All" ||
      (rating === "Good" && movie.rating > 8) ||
      (rating === "Ok" && movie.rating >= 6 && movie.rating <= 8) ||
      (rating === "Bad" && movie.rating < 6)
    );
  };

  // Combined filtered movies
  const filteredMovies = movies.filter(movie =>
    matchesGenre(movie, genre) &&
    matchesSearchTerm(movie, searchTerm) &&
    matchesRating(movie, rating)
  );

  return (
    <div className="p-6 space-y-6 flex flex-col items-center">
      {/* Heading */}
      <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-center text-[#7B542F]">
        Movie Grid <CiGrid42 />
      </h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-center w-full gap-6">
        {/* Search Input */}
        <div className="flex items-center flex-1 max-w-md gap-2 px-4 py-3 border border-gray-500 rounded-lg focus-within:border-[#7B542F] transition-colors duration-200 bg-white/5">
          <MdLocationSearching className="text-[#7B542F] text-xl" />
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-[#016B61] placeholder-gray-400"
          />
        </div>

        {/* Genre & Rating Filters */}
        <div className="flex gap-6 text-[#043915] flex-wrap">
          {/* Genre */}
          <div className="flex flex-col text-sm space-y-1">
            <label className="font-medium">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="bg-transparent border border-gray-400 rounded-md px-2 py-1 text-[#016B61] focus:border-[#7B542F] outline-none"
            >
              <option>All Genres</option>
              <option>Action</option>
              <option>Drama</option>
              <option>Fantasy</option>
              <option>Horror</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col text-sm space-y-1">
            <label className="font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="bg-transparent border border-gray-400 rounded-md px-2 py-1 text-[#016B61] focus:border-[#7B542F] outline-none"
            >
              <option>All</option>
              <option>Good</option>
              <option>Ok</option>
              <option>Bad</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id || index} movie={movie} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieGrid;
