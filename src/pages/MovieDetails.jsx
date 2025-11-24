import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../component/MovieCard";
import "../css/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addFavorite, removeFromFavorite } = useMovieContext();
  const favorite = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;
    if (favorite) removeFromFavorite(movie.id);
    else addFavorite(movie);
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-details-container">
      {loading ? (
        // Skeleton Loader
        <div className="skeleton-container">
          <div className="skeleton-backdrop"></div>
          <div className="skeleton-content">
            <div className="skeleton-poster"></div>
            <div className="skeleton-info">
              <div className="skeleton-line title"></div>
              <div className="skeleton-line tagline"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        </div>
      ) : (
        // Actual Movie Details
        <>
          {movie.backdrop_path && (
            <div
              className="movie-backdrop"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
            />
          )}
          <div className="movie-details-content">

            <div className="poster-box">
              <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
                ♥
              </button>
            </div>

            <div className="movie-info">
              <h1>{movie.title}</h1>
              {movie.tagline && <h3 className="tagline">"{movie.tagline}"</h3>}
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
              <p><strong>Runtime:</strong> {movie.runtime} min</p>
              <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
              <p><strong>Production Countries:</strong> {movie.production_countries?.map(c => c.name).join(", ")}</p>
              <p><strong>Languages:</strong> {movie.spoken_languages?.map(l => l.english_name).join(", ")}</p>
              <p><strong>Production Companies:</strong> {movie.production_companies?.map(p => p.name).join(", ")}</p>
              {movie.homepage && <p><a className="movie-link" href={movie.homepage} target="_blank">Visit Movie Website</a></p>}

              {movie.belongs_to_collection && (
                <div className="collection-box">
                  <h3>Collection: {movie.belongs_to_collection.name}</h3>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.belongs_to_collection.poster_path}`} alt="collection" />
                </div>
              )}

              {movie.videos?.results?.length > 0 && (
                <div className="trailer-box">
                  <h3>Trailer</h3>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                    title="Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {movie.credits?.cast?.length > 0 && (
                <div className="cast-box">
                  <h3>Cast</h3>
                  <div className="cast-grid">
                    {movie.credits.cast.slice(0, 10).map(actor => (
                      <div key={actor.id} className="cast-card">
                        {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />}
                        <p>{actor.name}</p>
                        <p className="character">as {actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {movie.similar?.results?.length > 0 && (
                <div className="similar-box">
                  <h3>Similar Movies</h3>
                  <div className="similar-grid">
                    {movie.similar.results.slice(0, 6).map(m => (
                      <MovieCard key={m.id} movie={m} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
