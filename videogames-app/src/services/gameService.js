const API_KEY = "df2b485774944dbbbf63e9b51f7b7583";
const BASE_URL = "https://api.rawg.io/api";

// Función principal para obtener juegos con filtros y ordenamiento
export const getGames = async (params = {}) => {
    try {
        // Parámetros base incluyendo ordenamiento por metacritic descendente
        const defaultParams = {
            key: API_KEY,
            ordering: '-metacritic',
            page_size: 10 // Ajusta según tus necesidades
        };
        
        // Combina los parámetros predeterminados con los proporcionados
        const queryParams = new URLSearchParams({
            ...defaultParams,
            ...params
        });
        
        const response = await fetch(`${BASE_URL}/games?${queryParams}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener juegos:", error);
        return { results: [], count: 0 };
    }
};

// Obtener juegos por plataforma
export const getGamesByPlatform = async (platformId, page = 1) => {
    return getGames({ platforms: platformId, page });
};

// Obtener juegos por género
export const getGamesByGenre = async (genreId, page = 1) => {
    return getGames({ genres: genreId, page });
};

// Obtener juegos por año
export const getGamesByYear = async (year, page = 1) => {
    // Para filtrar por año, necesitamos filtrar por rango de fechas
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    return getGames({ dates: `${startDate},${endDate}`, page });
};

// Obtener juegos por etiqueta (tag)
export const getGamesByTag = async (tagId, page = 1) => {
    return getGames({ tags: tagId, page });
};

// Obtener juegos por empresa desarrolladora
export const getGamesByDeveloper = async (developerId, page = 1) => {
    return getGames({ developers: developerId, page });
};

// Buscar juegos por texto
export const searchGames = async (searchQuery, page = 1) => {
    return getGames({ search: searchQuery, page });
};

// Obtener detalles de un juego específico
export const getGameDetails = async (gameId) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener detalles del juego:", error);
        return null;
    }
};

// Obtener trailers de un juego
export const getGameTrailers = async (gameId) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${gameId}/movies?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener trailers del juego:", error);
        return [];
    }
};

// Obtener capturas de pantalla de un juego
export const getGameScreenshots = async (gameId) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener capturas del juego:", error);
        return [];
    }
};

// Obtener listas de plataformas, géneros, etiquetas y desarrolladores para los filtros
export const getPlatforms = async () => {
    try {
        const response = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener plataformas:", error);
        return [];
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener géneros:", error);
        return [];
    }
};

export const getTags = async () => {
    try {
        const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener tags:", error);
        return [];
    }
};

export const getDevelopers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/developers?key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error al obtener desarrolladores:", error);
        return [];
    }
};