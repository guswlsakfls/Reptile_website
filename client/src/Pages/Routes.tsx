import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};