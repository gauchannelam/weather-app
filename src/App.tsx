import './App.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './components/weather';
import backgroundImg from './assets/weather-bg.png';

const MainWrapper = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-repeat: no-repeat;
background-size: cover;
background-image: url(${backgroundImg});
`;

function App() {
  return (
    <MainWrapper >
     <Weather/>
    </MainWrapper>
  );
}

export default App;
