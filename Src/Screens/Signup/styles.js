import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_container: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '5%'
    },
    image: {
        width: 300,
        height: 250
    },
    textinput_container: {
        // margin: 10,
        width: '100%',
        marginTop: 10,
        alignItems: 'center'

    },
    textinput: {
        // margin: 10,
        width: '80%',
        alignItems: 'center'
    },
    button_container: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        alignSelf: 'center'
    },
    inputText: {
        alignSelf: "flex-start"
    }


})
export default styles