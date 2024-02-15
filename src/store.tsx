import { createStore } from 'redux';
import { useDispatch } from 'react-redux';
import reducer from './model/reducer';

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export default store;