import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Screen from './Components/Screen';

function App() {
  return (
    <div  >
      <Header />
      <div className="d-flex gap-2 ">
        <Sidebar />
        <Screen/>
        
      </div>
      

    </div>
  );
}

export default App;
