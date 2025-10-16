import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Componets/Login.jsx";
import Signup from "./Componets/Signup.jsx";
import Dashboared from "./Componets/Dashboard.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboared />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App