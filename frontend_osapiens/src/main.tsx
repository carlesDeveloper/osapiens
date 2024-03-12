import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import FavoritesProvider from './context/FavoritesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
)
