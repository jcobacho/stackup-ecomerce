import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductPage from './inventory/pages/product'
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import NotFound from './core/pages/404'
import Header from './core/components/Header'
import HomePage from './core/pages/HomePage';

function App() {

  const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: (
    //         <Login authState={authState} isAuthenticated={isAuthenticated} />
    //     ),
    //     // children: [
    //     //     {
    //     //         path: "register",
    //     //         element: (
    //     //             <Register authState={authState} isAuthenticated={isAuthenticated} />
    //     //         ),
    //     //     },
    //     // ],
    // },
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
            // {
            //     path: "user/:username",
            //     element: <UserSpecificPosts isAuthenticated={isAuthenticated} />,
            //     loader: async ({ params }) => {
            //         return params.username;
            //     },
            // },
            // {
            //     path: "user/:username/post/edit/:postId",
            //     element: <EditPost isAuthenticated={isAuthenticated} />,
            //     loader: ({ params }) => {
            //         return { username: params.username, postId: params.postId };
            //     },
            // },
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
