import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { refreshTokens, logout } from '../../auth/services/authSlice'
import { RootState } from '../../store'
import { toCamelResponseHandler } from '../utils'
import { serverUrl } from '../utils'

const baseQuery = fetchBaseQuery({
    baseUrl: `${serverUrl}/api/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = (getState() as RootState).auth.access;
        if (
            token            
        ) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: "include",
    responseHandler: toCamelResponseHandler

})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    console.log("args, api, extraOptions")
    console.log(args, api, extraOptions)
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const {getState } = api
    const refresh = (getState() as RootState).auth.refresh
    
    const refreshResult = await baseQuery({
        url:  '/token/refresh/',
        method: 'POST',
        body: { refresh },
      }, api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(refreshTokens(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'ProductAdmin'],
  endpoints: () => ({}),
})

export { baseQuery, baseQueryWithReauth, coreApi}