import React, { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';

const PLATFORM_IDS = {
    PC: 4,
    PS4: 18,
    PS5: 187,
    XboxOne: 1,
    XboxSeriesX: 186,
    Switch: 7,
    iOS: 3,
    Android: 21,
    Mac: 5,
    Linux: 6,
    Nintendo3DS: 8,
    PlayStationVita: 19,
    WiiU: 10,
    PlayStation3: 16,
    Xbox360: 14,
    Wii: 11,
    PlayStation2: 15,
    Xbox: 80,
    NintendoDS: 9,
    GameCube: 105,
    Nintendo64: 83,
    GameBoyAdvance: 24,
    GameBoyColor: 43,
    GameBoy: 26,
    SNES: 79,
    NES: 49,
    Atari2600: 28,
    Atari5200: 31,
    Atari7800: 23,
    AtariLynx: 22,
    AtariXEGS: 25,
    Genesis: 167,
    SegaSaturn: 107,
    Dreamcast: 106,
    GameGear: 77,
    NeoGeo: 12
};

function HomePage({ searchQuery, onSearch }) {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Imagen de respaldo en base64 (un simple rectángulo gris con texto "No Image")
    const noImageBase64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTk5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";

    const apiKey = 'df2b485774944dbbbf63e9b51f7b7583';
    const pageSize = 20; 

    const fetchGames = useCallback(async () => {
        setLoading(true);
        try {
            let apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page=${currentPage}&page_size=${pageSize}&ordering=-metacritic`;

            console.log("🔍 Parámetros de búsqueda:", searchQuery);

            if (searchQuery?.year) {
                apiUrl += `&dates=${searchQuery.year}-01-01,${searchQuery.year}-12-31`;
            }
            if (searchQuery?.name) {
                apiUrl += `&search=${encodeURIComponent(searchQuery.name)}`;
            }
            if (searchQuery?.platform && PLATFORM_IDS[searchQuery.platform]) {
                apiUrl += `&platforms=${PLATFORM_IDS[searchQuery.platform]}`;
            }
            if (searchQuery?.genre) {
                const genreId = await getGenreIdByName(searchQuery.genre);
                if (genreId) {
                    apiUrl += `&genres=${genreId}`;
                }
            }
            if (searchQuery?.company) {
                const companyId = await getCompanyIdByName(searchQuery.company);
                if (companyId) {
                    apiUrl += `&developers=${companyId}`;
                }
            }
            if (searchQuery?.tags) {
                const tagIds = await Promise.all(searchQuery.tags.map(tag => getTagIdByName(tag)));
                apiUrl += `&tags=${tagIds.filter(id => id !== null).join(',')}`;
            }

            console.log("Llamando a la API con URL:", apiUrl);

            const response = await axios.get(apiUrl);
            setGames(response.data.results);
            setTotalPages(Math.ceil(response.data.count / pageSize));

            console.log("Juegos obtenidos:", response.data.results);
        } catch (error) {
            console.error('❌ Error al obtener los juegos:', error);
        } finally {
            setLoading(false);
        }
    }, [apiKey, currentPage, searchQuery]);

    const getGenreIdByName = async (genreName) => {
        try {
            const response = await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`);
            const genre = response.data.results.find(g => g.name.toLowerCase() === genreName.toLowerCase());
            return genre ? genre.id : null;
        } catch (error) {
            console.error('Error al obtener el ID del género:', error);
            return null;
        }
    };

    const getCompanyIdByName = async (companyName) => {
        try {
            const response = await axios.get(`https://api.rawg.io/api/developers?key=${apiKey}`);
            const company = response.data.results.find(c => c.name.toLowerCase() === companyName.toLowerCase());
            return company ? company.id : null;
        } catch (error) {
            console.error('Error al obtener el ID de la empresa:', error);
            return null;
        }
    };

    const getTagIdByName = async (tagName) => {
        try {
            const response = await axios.get(`https://api.rawg.io/api/tags?key=${apiKey}`);
            const tag = response.data.results.find(t => t.name.toLowerCase() === tagName.toLowerCase());
            return tag ? tag.id : null;
        } catch (error) {
            console.error('Error al obtener el ID del tag:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Función para manejar errores en la carga de imágenes
    const handleImageError = (e) => {
        e.target.onerror = null; // Evita bucles infinitos
        e.target.src = noImageBase64; // Usa la imagen base64 en lugar de via.placeholder
    };

    return (
        <div>
            <h1>🎮 Bienvenido a la Página de Videojuegos 🎮</h1>
            <Navbar onSearch={onSearch} />
            <div className="game-list">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <Link to={`/game/${game.id}`}>
                            <img 
                                src={game.background_image || noImageBase64} 
                                alt={game.name} 
                                className="game-image" 
                                onError={handleImageError}
                            />
                            <h3>{game.name}</h3>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    ⬅ Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Siguiente ➡
                </button>
            </div>

            {loading && <div>Cargando juegos...</div>}
        </div>
    );
}

export default HomePage;