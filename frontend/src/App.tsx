import ProductPage from './inventory/pages/ProductPage'
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { Navigate, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import NotFound from './core/pages/404'
// import Header from './core/components/Header'
import HomePage from './core/pages/HomePage';
import LoginPage from './auth/pages/LoginPage'
import { useAppDispatch, useAppSelector } from './store'
import Root from './core/pages/Root'
import { refreshAuthentication } from './auth/services/authSlice'
import UserPage from './user/pages/UserPage'
import AccessDenied from './core/pages/403'

function App() {

    const authState = useAppSelector((state) => state.auth);

    if (sessionStorage.getItem("isAuthenticated") === "true" && authState.access === null) {
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
                element: authState?.user ? authState.user?.isShopper || authState.user?.isSeller  ? <ProductPage  />: <AccessDenied/> :<Navigate to='/login'/>,

            },            
            {
                path: "/users",
                element: authState?.user ? authState.user?.isStaff ? <UserPage  />: <AccessDenied/> :<Navigate to='/login'/>,
            },            
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);


  return (
    <RouterProvider router={router} />

  )
}


export default App
