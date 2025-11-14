'use client';

import { useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import globalReducer from '@/state';
import { apiApplicant } from './apiApplicant';
import { apiProvider } from './apiProvider';
import { apiAuth } from './apiAuth';
import { apiScholarship } from './apiScholarship';
import { apiSubscription } from './apiSubscription';

/* REDUX STORE */
const rootReducer = combineReducers({
  global: globalReducer,
  [apiApplicant.reducerPath]: apiApplicant.reducer,
  [apiProvider.reducerPath]: apiProvider.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiScholarship.reducerPath]: apiScholarship.reducer,
  [apiSubscription.reducerPath]: apiSubscription.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiApplicant.middleware,
        apiProvider.middleware,
        apiAuth.middleware,
        apiScholarship.middleware,
        apiSubscription.middleware
      ),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
