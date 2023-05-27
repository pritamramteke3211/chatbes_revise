import { Button, StyleSheet, Text, TextInput, View,SafeAreaView } from 'react-native'
import React,{useEffect,useState} from 'react'
import socketServices from './src/utils/SocketService'
// import Routes from './src/navigations/Routes'
// import { Provider } from 'react-redux'
// import store from './src/redux/store'
// import  { clearAllItem, getItem } from './src/utils/utils'
// import { saveUserData } from './src/redux/reducers/auth'


const App = () => {

  const [message, setmessage] = useState('')
  const [data, setdata] = useState([])

  // useEffect(() => {
  //   (async()=>{
  //     let userData = await getItem('userData')
  //     if (!!userData) {
  //       store.dispatch(saveUserData(userData))
  //     }
     
  //   })();  
  // }, [])

  useEffect(() => {
    socketServices.initializeSocket()
  }, [])

  useEffect(() => {
    socketServices.on('received_message', msg =>{
      console.log("message received in reactApp", msg)
    })
  }, [])

  const sendMessage = ()=>{
    if (!!message) {
      socketServices.emit('send_message', message)    
        
      return;
    }
    alert('Please enter your message')
  }
  
  

  return (
    // <Provider store={store}>
    <SafeAreaView style={styles.container}>
      {/* <Routes/> */}
      <TextInput
      placeholder='Enter your message..'
      style={styles.inputStyle}
      value={message}
      onChangeText={text => setmessage(text)}
      />
      <Button 
      title='Send'
      onPress={sendMessage}
      />
    </SafeAreaView>
    // </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,  
  },
  inputStyle:{
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
  },
})