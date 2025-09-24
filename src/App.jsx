import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Navbar from './Components/Navbar'
import GalleryPage from './pages/Gallery'
import Footer from './Components/Footer'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div>
        <h1 className='text-4xl underline'>Art Gallery</h1>
      </div>
    <Footer />
        
    </>
  )
}

export default App
