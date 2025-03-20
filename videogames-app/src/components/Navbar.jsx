import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [platform, setPlatform] = useState("");
    const [tag, setTag] = useState("");
    const [company, setCompany] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const filters = {
            name: query,
            year: year,
            genre: genre,
            platform: platform,
            tag: tag,
            company: company
        };
        onSearch(filters);
    };

    return (
        <nav>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar videojuegos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por año..."
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por género..."
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por plataforma..."
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por tag..."
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Buscar por empresa..."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button type="submit">
                    Buscar
                </button>
            </form>
        </nav>
    );
};

export default Navbar;