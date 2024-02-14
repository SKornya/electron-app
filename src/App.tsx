import Chart from './components/Chart/Chart';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <Chart />
      </div>
    </>
  );
}

export default App;
