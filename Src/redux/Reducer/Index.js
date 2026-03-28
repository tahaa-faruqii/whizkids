import Theme_Change from '../Constant'

const initialState = {
    mode: "light"
}

const Theme_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Theme_Change:
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state

    }
}
export default Theme_Reducer