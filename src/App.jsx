import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import './index.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import routes from './routes/routes'
import Purchase from "./pages/Purchase"
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at top */}
        <Navbar />
      

        {/* Main content grows to fill space */}
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="/purchases" element={<Purchase />} />

          </Routes>
          
        </main>

        {/* Footer at bottom */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
