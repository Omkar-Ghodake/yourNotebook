import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div className='mb-3' style={{height: '3rem'}}>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
          </div>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />} />
              <Route path='/about' element={<About showAlert={showAlert} />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
