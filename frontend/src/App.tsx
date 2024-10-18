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
import CreateUser from './user/pages/CreateUser';
import EditUser from './user/pages/EditUser';
import { coreApi } from './core/services/coreSlice';
import CheckoutPage from './cart/pages/CheckoutPage';
import ProductDetailPage from './inventory/pages/ProductDetailPage';
import ProductAdminListPage from './inventory/pages/ProductAdminListPage';
import CreateProductAdminPage from './inventory/pages/CreateProductAdminPage';
import EditProductAdminPage from './inventory/pages/EditProductAdminPage';
import OrdersPage from './cart/pages/OrdersPage';
import RegisterPage from './auth/pages/RegisterPage';

function App() {

    const authState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()

    if (sessionStorage.getItem("isAuthenticated") === "true" && authState.access === null) {

        // update state with token from session
        dispatch(refreshAuthentication())
                     
    }

    async function loadCart() {
        await dispatch(coreApi.endpoints.getMyCart.initiate( undefined, {forceRefetch: true })) 

    }

    // only load cart if authenticated and user is shopper otherwise it will load on login
    if (sessionStorage.getItem("isAuthenticated") === "true" && authState.access !== null && authState.user?.isShopper) {
        loadCart()   
     }
  
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage/>
                
        },
        {
            path: "/register",
            element: <RegisterPage/>
                
        },
        {
            path: "/",
            element: <Root  />,                  
            children: [
                {
                    path: "/",
                    element: <Navigate to={'/products'}  />,

                },  
                {
                    path: "/products",
                    element: <ProductPage  />
                },  
                {
                    path: "/products/:id/detail",
                    element: <ProductDetailPage  />,
                    loader: async ({ params }) => {
                        return params.id;
                    },
                },
                {
                    path: "/products/manage/create",
                    element: authState?.user ? authState.user?.isSeller  ? <CreateProductAdminPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    
                }, 
                {
                    path: "/products/manage/:id/edit",
                    element: authState?.user ? authState.user?.isSeller  ? <EditProductAdminPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    loader: async ({ params }) => {
                        return params.id;
                    },
                }, 
                {
                    path: "/products/manage/",
                    element: authState?.user ? authState.user?.isSeller  ? <ProductAdminListPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    
                }, 
                {
                    path: "/users/create",
                    element: authState?.user ? authState.user?.isStaff ? <CreateUser  />: <AccessDenied/> :<Navigate to='/login'/>,
                },           
                {
                    path: "/users",
                    element: authState?.user ? authState.user?.isStaff ? <UserPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    
                },     
                {
                    path: "users/:id/edit",
                    element: authState?.user ? authState.user?.isStaff ? <EditUser  />: <AccessDenied/> :<Navigate to='/login'/>,
                    loader: async ({ params }) => {
                        return params.id;
                    },
                },  
                
                {
                    path: "/checkout",
                    element: authState?.user ? authState.user?.isShopper ? <CheckoutPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    
                },  
                {
                    path: "/orders",
                    element: authState?.user ? authState.user?.isShopper ? <OrdersPage  />: <AccessDenied/> :<Navigate to='/login'/>,
                    
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
