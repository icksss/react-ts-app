import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import About from './components/About'
import Product from './components/Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <div>
         <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:productId" element={<Product name="사과" price={1000} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
