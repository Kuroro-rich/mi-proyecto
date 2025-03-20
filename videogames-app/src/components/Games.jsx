import React, { useState, useEffect } from "react";

const API_KEY = "df2b485774944dbbbf63e9b51f7b7583"; // Reemplaza con tu API key de RAWG
const API_URL = "https://api.rawg.io/api/games";

const Games = () => {
    const [games, setGames] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(4); // PC por defecto

    const platforms = [
        { id: 4, name: "PC" },
        { id: 187, name: "PlayStation 5" },
        { id: 1, name: "Xbox One" },
        { id: 7, name: "Nintendo Switch" },
        { id: 3, name: "iOS" },
        { id: 18, name: "PlayStation 4" }
    ];

    useEffect(() => {
        fetchGames();
    }, [selectedPlatform]);

    const fetchGames = async () => {
        try {
            const response = await fetch(`${API_URL}?platforms=${selectedPlatform}&key=${API_KEY}`);
            const data = await response.json();
            setGames(data.results || []);
        } catch (error) {
            console.error("Error al obtener juegos:", error);
        }
    };

    return (
        <div>
            <h1>🎮 Videojuegos por Plataforma</h1>

            {/* Selector de plataforma */}
            <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(Number(e.target.value))}>
                {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                        {platform.name}
                    </option>
                ))}
            </select>

            <button onClick={fetchGames}>Buscar</button>

            {/* Lista de juegos */}
            {games.length > 0 ? (
                <div>
                    {games.map((game) => (
                        <div key={game.id}>
                            <h2>{game.name}</h2>
                            <img src={game.background_image} alt={game.name} width="200" />
                            <p>Rating: {game.rating}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se encontraron juegos para esta plataforma.</p>
            )}
        </div>
    );
};

export default Games;
