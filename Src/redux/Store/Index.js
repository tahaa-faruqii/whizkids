import { createStore, combineReducers } from 'redux'
import Theme_Reducer from '../Reducer/Index'


const user_reducer = combineReducers({
    theme: Theme_Reducer
})


const configurestore = () => {
    return (
        createStore(user_reducer)
    )
}


export default configurestore