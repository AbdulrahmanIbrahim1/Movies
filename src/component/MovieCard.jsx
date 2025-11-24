import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'
import { Link } from 'react-router-dom';
export default function MovieCard({ movie }) {

    const { isFavorite, addFavorite, removeFromFavorite } = useMovieContext()
    const favorite = isFavorite(movie.id);
    function onFavoriteClick(e) {
        // console.log("Favorite clicked for movie:", movie.title);
        e.preventDefault();
        if (favorite) {
            removeFromFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            {/* <div className='movie-card'> */}
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            {/* </div> */}
        </Link>
    )
}
