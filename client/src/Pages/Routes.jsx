import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Morph from './MorphPage/Morph';
import Board from './BoardPage/Board';
import Write from './BoardPage/Write';
import ViewBoard from './BoardPage/ViewBoard';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/morph" element={<Morph />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:id" element={<ViewBoard />} />
            <Route path="/board/write" element={<Write />} />
            <Route path="/board/write/:id" element={<Write />} />
        </Routes>
    );
};