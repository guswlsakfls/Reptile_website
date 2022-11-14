import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Morph from './MorphPage/Morph';
import Board from './BoardPage/Board';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/morph" element={<Morph />} />
            <Route path="/board" element={<Board />} />
        </Routes>
    );
};