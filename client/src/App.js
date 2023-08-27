import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Error from './components/Error';

function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
