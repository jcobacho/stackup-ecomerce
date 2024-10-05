import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductPage from './inventory/pages/product'
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import NotFound from './core/pages/404'
// import Header from './core/components/Header'
import HomePage from './core/pages/HomePage';
import LoginPage from './auth/pages/LoginPage'

function App() {

  const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <LoginPage />
        )       
    },
    {
        path: "/",
        element: (
            <HomePage />
        ),        
        children: [
            {
                path: "/products",
                element: <ProductPage />,
            },            
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);


  return (
    <>
      <div>
        	<RouterProvider router={router} />
    	</div>
      
    </>
  )
}


export default App
