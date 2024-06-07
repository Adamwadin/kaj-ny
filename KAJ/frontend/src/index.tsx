import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '../src/components/Authcontexts';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';



 
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
   
  </React.StrictMode>
);


reportWebVitals();
