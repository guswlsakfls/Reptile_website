import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './Pages/Routes';
import GlobalStyles from './Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from "./Styles/Theme"

function App() {
  return (
    <>
		<GlobalStyles />
		<ThemeProvider theme={ theme }>
			<Router>
				<RoutesComponent />
			</Router>
		</ThemeProvider>
	</>
  );
}

export default App;
