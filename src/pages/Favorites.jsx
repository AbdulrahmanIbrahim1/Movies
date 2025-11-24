import MovieCard from '../component/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/Favorites.css'
function Favorites() {
    const { favorites } = useMovieContext();
    if (favorites) return (
        <div className="favorites">
            <h2>Your Favorite Movies</h2>
            <div className="movies-grid">
                {favorites.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>);
    return (
        <div className="favorites-empty">
            <h2>No favorites added yet</h2>
            <p>Start adding some movies to your favorites list and they will apper here.</p>
        </div>
    )
}

export default Favorites;