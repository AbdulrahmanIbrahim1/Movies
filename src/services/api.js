const API_KEY = '97dc6945414184a4f681fcfc36fcc0b8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();    
    return data.results;
}
export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data);
    
    return data.results;
}

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,similar`);
  const data = await response.json();
  console.log('Movie details data:', data);
  return data;
};

// جلب الأفلام العربية حسب اللغة "ar" (Arabic)
export const getArabicMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ar&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results; // قائمة الأفلام
  } catch (error) {
    console.error('Failed to fetch Arabic movies:', error);
    return [];
  }
};

// جلب المسلسلات العربية
export const getArabicTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ar&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results; // قائمة المسلسلات
  } catch (error) {
    console.error('Failed to fetch Arabic TV shows:', error);
    return [];
  }
};

