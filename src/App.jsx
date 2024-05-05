import React, { useEffect, useState } from "react";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/movieCard";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

const API_KEY_URL = "https://omdbapi.com/?apikey=aaa9cf9c";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  const searchMovies = async (title) => {
    const res = await fetch(`${API_KEY_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("iron man");
  }, []);

  return (
    <>
      <div className="app">
        <h1>Movie Land</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Find your favorite movies, TV shows, anime and more"
            value={searchTerm}
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchMovies(searchTerm);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => {
              searchMovies(searchTerm);
            }}
          />
        </div>
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movie found</h2>
            <Analytics />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
