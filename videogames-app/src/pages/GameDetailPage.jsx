import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/GameDetailPage.css';

function GameDetailPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://api.rawg.io/api/games/${id}?key=df2b485774944dbbbf63e9b51f7b7583`)
            .then((response) => {
                setGame(response.data);
            })
            .catch((error) => console.error('Error al obtener los detalles del juego:', error));
    }, [id]);

    if (!game) {
        return <div>Cargando...</div>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="game-detail-container">
            <button onClick={handleGoBack} className="back-button">
                &lt; Volver
            </button>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} className="game-detail-image" />
            <div className="game-details">
                <p>
                    <strong>Descripción:</strong> {game.description_raw}
                </p>
                <p>
                    <strong>Fecha de lanzamiento:</strong> {game.released}
                </p>
                <p>
                    <strong>Rating:</strong> {game.rating}
                </p>
                <p>
                    <strong>Géneros:</strong> {game.genres.map((genre) => genre.name).join(', ')}
                </p>
                <p>
                    <strong>Plataformas:</strong> {game.platforms.map((platform) => platform.platform.name).join(', ')}
                </p>
                <a href={game.website} target="_blank" rel="noopener noreferrer">
                    Sitio web oficial
                </a>
            </div>
        </div>
    );
}

export default GameDetailPage;