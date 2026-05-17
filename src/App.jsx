import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Producoes from './pages/Producoes'
import Admin from './pages/Admin'
import ContentDetail from './pages/ContentDetail'

import Nav from './components/Nav'
import Footer from './components/Footer'
import { LoadingProvider } from './context/LoadingContext'

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter basename="/Oficina-Legal">
        <Nav/>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producoes/*" element={<Producoes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/detail/:type/:id" element={<ContentDetail />} />
         </Routes>
         <Footer/>
      </BrowserRouter>
    </LoadingProvider>
  )
}

export default App
