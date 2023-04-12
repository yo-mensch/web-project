import './App.css';
import Body from './components/Body';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header header="Example header"></Header>
      <header className="App-header">
        <img src="https://www.pngimages.in/uploads/png-webp/2022/2022-July/Cat_Transparent_Background.webp" className="App-logo" alt="logo" />
      </header>
      <Body></Body>
    </div>
  );
}

export default App;
