// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Textinput from './Src/Components/Textinput'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { switchMode } from './Src/redux/Action';
import CustomButton from './Src/Components/CustomButton'
import { Provider } from 'react-redux';
import configurestore from './Src/redux/Store/Index'
import Forgotpassword from './Src/Screens/Forgotpassword/Index';
import Intro from './Src/Screens/Intro/Index';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './Src/Navigation/StackNav';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
const store = configurestore();
const App = () => {
  // const theme = useSelector(state => state.theme);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '340946878582-je5kkogb70neteksnpio4lpk4r5b9qk2.apps.googleusercontent.com'

    })
  }, [])
  // // initialize action dispatcher
  // const dispatch = useDispatch();
  // // define a component mode state
  // const [mode, setMode] = useState(theme.mode);
  // const handleThemeChange = () => {
  //   dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
  // }

  // useEffect(() => {
  //   setMode(theme.mode);
  // }, [theme]);
  return (
    // <View style={mode == 'light' ? styles.container_light : styles.container_dark}>
    //   <Text>App</Text>
    //   <Textinput />
    //   <View style={{ marginTop: '50%', alignItems: 'center' }}>

    //     <CustomButton label={'signup'} color={'#18B0C8'} borderColor={'#18B0C8'}
    //     />
    //     <View style={{ marginTop: '20%' }} />

    //     <CustomButton label={'Login'} color={'#152524'} borderColor={'#183D45'}
    //     />
    //   </View>
    // </View>
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}
      >
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

  ,
  container_dark: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  }

  ,
  text_light: {
    marginBottom: 20,
    color: '#000'
  }

  ,
  text_dark: {
    marginBottom: 20,
    color: "#fff"
  }
}

);