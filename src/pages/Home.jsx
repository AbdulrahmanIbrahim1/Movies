import { useEffect, useState } from "react";
import MovieCard from "../component/MovieCard"
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";

export default function Home() {

    const [searchTerm, setSearchTerm] = useState("")

    const [movies, setMovies] = useState([])

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
                console.log('your movies is ', popularMovies);
            } catch (error) {
                console.log(error);
                setError("Failed to load popular movies.");
            } finally { setLoading(false); }
        }
        loadPopularMovies();
    }, [])

    // const movies = [
    //     {
    //         id: 1,
    //         Title: "Inception",
    //         release_date: "2010-07-16",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //         ,
    //     },
    //     {
    //         id: 2,
    //         Title: "The Matrix",
    //         release_date: "1999-03-31",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    //     {
    //         id: 3,
    //         Title: "Interstellar",
    //         release_date: "2014-11-07",
    //         Poster: "https://posterjack.ca/cdn/shop/articles/Tips_for_Taking_Photos_at_the_Beach_55dd7d25-11df-4acf-844f-a5b4ebeff4df.jpg?v=1738158629&width=2048"
    //     },
    // ]

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchTerm);
            setMovies(searchResults);
            setError(null);
        }
        catch (err) {
            console.error(err);
            setError("An error occurred while searching. Please try again.");
        } finally {
            setLoading(false);
        }

        setSearchTerm("")
    }

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (<div className="loading">Loading...</div>) : (<div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>)
            }

        </div>
    )
}
