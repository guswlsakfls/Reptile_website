import { Route, Routes } from 'react-router-dom';
import { Fathome } from './Fattail/Fathome';
import Home from './Home/Home';
import Main from './MorphPage/Main';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/morph" element={<Main />} />
			<Route path="/fathome" element={<Fathome />} />
        </Routes>
    );
};