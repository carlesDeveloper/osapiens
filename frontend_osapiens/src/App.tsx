import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import './index.css'
import PlanetsPage from './pages/PlanetsPage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';


function App() {

  return (
    <>
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="planets" element={<PlanetsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
