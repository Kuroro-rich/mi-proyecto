import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/game/:id" component={GameDetailPage} />
            </Switch>
        </Router>
    );
}

export default App;