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
import { useAppDispatch, useAppSelector } from './store'
import Root from './core/pages/Root'
import { refreshAuthentication } from './auth/services/authSlice'

function App() {

    const authState = useAppSelector((state) => state.auth);
        
    if (sessionStorage.getItem("isAuthenticated") === "true" && authState.token === null) {
        console.log("needs update!")
        const dispatch = useAppDispatch()
        dispatch(refreshAuthentication())
    }
  
  const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>
                
    },
    {
        path: "/",
        element: <Root  />,                  
        children: [
            {
                path: "/",
                element: <HomePage  />,
            },  
            {
                path: "/products",
                element: <ProductPage  />,
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
