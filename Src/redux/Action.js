import Theme_Change from '../redux/Constant'


const switchMode = (mode) => {
    return {

        type: Theme_Change,
        payload: mode
    }

}
export { switchMode }