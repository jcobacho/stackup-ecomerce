import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./inventory/services/productSlice";
// import { authBlogApi, refreshAuthentication } from "./services/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authApi } from "./auth/services/authSlice";
import authReducer from "./auth/services/authSlice";
import { userApi } from "./user/services/userSlice";
// import userReducer from "./user/services/userSlice";


const store = configureStore({
	reducer: {
    	[productApi.reducerPath]: productApi.reducer,
    	[authApi.reducerPath]: authApi.reducer,
    	[userApi.reducerPath]: userApi.reducer,
    	// user: userReducer,
		auth: authReducer

    },
	middleware: (getDefaultMiddleware) => {
    	return getDefaultMiddleware()
        	.concat(productApi.middleware)
        	.concat(authApi.middleware)
        	.concat(userApi.middleware)
	},
});

/**
 *  This is a very _common pattern_ for Redux.
 **/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;