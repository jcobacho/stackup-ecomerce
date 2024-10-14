import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authApi } from "./auth/services/authSlice";
import authReducer from "./auth/services/authSlice";
import { coreApi } from "./core/services/coreSlice";
// import userReducer from "./user/services/userSlice";


const store = configureStore({
	reducer: {
    	[coreApi.reducerPath]: coreApi.reducer,
    	[authApi.reducerPath]: authApi.reducer,
		auth: authReducer

    },
	middleware: (getDefaultMiddleware) => {
    	return getDefaultMiddleware()
        	.concat(coreApi.middleware)
        	.concat(authApi.middleware)
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