import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GameDetailPage from '../pages/GameDetailPage';
import Navbar from '../components/Navbar';

const AppRouter = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage searchQuery={searchQuery} onSearch={handleSearch} />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;