import logo from './logo.svg';
import './Home.css';
import Login from './Login';


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Ocktank Bank
        </p>
      </header>
      <Login></Login>
    </div>
  );
}

export default Home;
