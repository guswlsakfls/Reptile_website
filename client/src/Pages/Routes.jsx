import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import CalMorph from './CalMorph/CalMorph';
import ViewMorph from './ViewMorph/ViewMorph';
import Board from './BoardPage/Board';
import Write from './BoardPage/Write';
import ViewBoard from './BoardPage/ViewBoard';
import { Fathome } from './Pages/Fattail/fathome';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
			<Route path="/Pages/Fattail/Fathome" element={<Fathome/>}/>
            <Route path="/morph/cal" element={<CalMorph />} />
            <Route path="/board/list" element={<Board />} />
            <Route path="/morph/view" element={<ViewMorph />} />
            <Route path="/board/view" element={<ViewBoard />} />
            <Route path="/board/write" element={<Write />} />
            <Route path="/board/write/:id" element={<Write />} />
        </Routes>
    );
};