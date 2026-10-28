// API handling for TMDB integration
class TMDBAPI {
    constructor() {
        // You would need to get a real API key from TMDB
        this.apiKey = '98dd561c2694073a8894218235f011e7'; // Replace with your actual API key
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    }

    // Get popular movies
    async getPopularMovies() {
        try {
            const response = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`);
            const data = await response.json();
            return this.formatMovies(data.results);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            return [];
        }
    }

    // Get popular TV shows
    async getPopularTV() {
        try {
            const response = await fetch(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`);
            const data = await response.json();
            return this.formatTV(data.results);
        } catch (error) {
            console.error('Error fetching popular TV shows:', error);
            return [];
        }
    }

    // Get featured content (top rated)
    async getFeaturedContent() {
        try {
            const movieResponse = await fetch(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
            const tvResponse = await fetch(`${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
            
            const movieData = await movieResponse.json();
            const tvData = await tvResponse.json();
            
            // Combine and format content
            const movies = this.formatMovies(movieData.results.slice(0, 5));
            const tvShows = this.formatTV(tvData.results.slice(0, 5));
            
            return [...movies, ...tvShows];
        } catch (error) {
            console.error('Error fetching featured content:', error);
            return [];
        }
    }

    // Search for movies or TV shows
    async search(query) {
        try {
            const response = await fetch(`${this.baseUrl}/search/multi?api_key=${this.apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
            const data = await response.json();
            return this.formatSearchResults(data.results);
        } catch (error) {
            console.error('Error searching content:', error);
            return [];
        }
    }

    // Get movie details
    async getMovieDetails(movieId) {
        try {
            const response = await fetch(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`);
            const data = await response.json();
            return this.formatMovieDetails(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }

    // Get TV show details
    async getTVShowDetails(tvId) {
        try {
            const response = await fetch(`${this.baseUrl}/tv/${tvId}?api_key=${this.apiKey}&language=en-US`);
            const data = await response.json();
            return this.formatTVDetails(data);
        } catch (error) {
            console.error('Error fetching TV show details:', error);
            return null;
        }
    }

    // Format movies for display
    formatMovies(movies) {
        return movies.map(movie => ({
            id: movie.id,
            title: movie.title || movie.name,
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
            poster: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : 'https://placehold.co/180x270/1f1f1f/FFFFFF?text=No+Image',
            rating: movie.vote_average,
            type: 'movie',
            description: movie.overview
        }));
    }

    // Format TV shows for display
    formatTV(tvShows) {
        return tvShows.map(show => ({
            id: show.id,
            title: show.name,
            year: show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A',
            poster: show.poster_path ? `${this.imageBaseUrl}${show.poster_path}` : 'https://placehold.co/180x270/1f1f1f/FFFFFF?text=No+Image',
            rating: show.vote_average,
            type: 'tv',
            description: show.overview
        }));
    }

    // Format search results
    formatSearchResults(results) {
        return results.filter(item => item.poster_path).map(item => ({
            id: item.id,
            title: item.title || item.name,
            year: item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear() : 'N/A',
            poster: item.poster_path ? `${this.imageBaseUrl}${item.poster_path}` : 'https://placehold.co/180x270/1f1f1f/FFFFFF?text=No+Image',
            type: item.media_type,
            description: item.overview
        }));
    }

    // Format movie details
    formatMovieDetails(movie) {
        return {
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
            poster: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : 'https://placehold.co/180x270/1f1f1f/FFFFFF?text=No+Image',
            backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '',
            rating: movie.vote_average,
            duration: movie.runtime,
            genres: movie.genres.map(g => g.name),
            description: movie.overview
        };
    }

    // Format TV show details
    formatTVDetails(show) {
        return {
            id: show.id,
            title: show.name,
            year: show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A',
            poster: show.poster_path ? `${this.imageBaseUrl}${show.poster_path}` : 'https://placehold.co/180x270/1f1f1f/FFFFFF?text=No+Image',
            backdrop: show.backdrop_path ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}` : '',
            rating: show.vote_average,
            seasons: show.number_of_seasons,
            episodes: show.number_of_episodes,
            genres: show.genres.map(g => g.name),
            description: show.overview
        };
    }
}

// Create global API instance
const tmdbAPI = new TMDBAPI();