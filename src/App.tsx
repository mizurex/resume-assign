import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Resume from './pages/resume'



function Protected({children}:{children:React.ReactNode}){
  const isAuthed = sessionStorage.getItem('isAuthed') ?? sessionStorage.getItem('isAuth');
  if(isAuthed){
    return children;
  }
  return <Navigate to="/" />
}

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/resume" element={<Protected>
      <Resume/>
    </Protected>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
