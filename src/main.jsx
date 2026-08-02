import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SubjectsProvider from "./context/SubjectsContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubjectsProvider>
      <App />
    </SubjectsProvider>
  </StrictMode>,
)
