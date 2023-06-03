import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
