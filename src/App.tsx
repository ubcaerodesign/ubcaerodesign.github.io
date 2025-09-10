import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      {/* HIDDEN */}
      <footer className="footer hidden"> 
        <p>© {new Date().getFullYear()} React + Vite + TS on GitHub Pages</p>
      </footer>
    </div>
  )
}
