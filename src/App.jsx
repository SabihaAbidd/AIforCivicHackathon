import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import AskAwaaz from './pages/AskAwaaz.jsx'
import Learn from './pages/Learn.jsx'
import CivicCards from './pages/CivicCards.jsx'
import Quiz from './pages/Quiz.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"       element={<Home />} />
        <Route path="/ask"    element={<AskAwaaz />} />
        <Route path="/learn"  element={<Learn />} />
        <Route path="/cards"  element={<CivicCards />} />
        <Route path="/quiz"   element={<Quiz />} />
        <Route path="/about"  element={<About />} />
      </Route>
    </Routes>
  )
}
