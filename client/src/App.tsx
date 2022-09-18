import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './Pages/Routes';
import GlobalStyles from './Styles/GlobalStyles';

function App() {
  return (
    <>
		<GlobalStyles />
		<Router>
			<RoutesComponent />
		</Router>
	</>
  );
}

export default App;
