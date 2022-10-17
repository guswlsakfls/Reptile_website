import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Page1 from './Page1/Page1';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page1" element={<Page1 />} />
        </Routes>
    );
};