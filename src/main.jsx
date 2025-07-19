import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx'; 
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <CssBaseline /> 
      <App />
    </BrowserRouter>
);