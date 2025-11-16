import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RecipeProvider } from './store/RecipeContext';
import { HashRouter } from 'react-router-dom';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecipeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </RecipeProvider>
  </React.StrictMode>
);