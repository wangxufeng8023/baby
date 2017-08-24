import {createStore,combineReducers,applyMiddleware} from 'redux';
import {calculate} from './reducers';
const rootReducers = combineReducers({
	calculate,
});
let store = createStore(rootReducers);
export const getStore=()=>{
	return store;
}