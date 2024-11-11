import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, StyledButton, ButtonText, Button, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../Control/Firebase'

import { Fontisto } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'


const VisLogin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleSubmitting, setGoogleSubmitting]=useState(false);
  const[message,setMessage]=useState();
  const[messageType,setMessageType]=useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate("VMD")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  

  const handleGoogleSigingIn= () => {
    const config= {
      webClientId: '270025882154-47df79hhbm6sc51hbla14e6vaphn7p95.apps.googleusercontent.com',
      
    };
    Google
      .logInAsync(config)
      .then((result)=>{
        const {type,user}=result;
        console.log(error)
        if(type=='success'){
          const {email,name,photoUrl}=user; 
          setTimeout(()=>props.navigate('VMD',{email,name,photoUrl}),1000)
           handleMessage('Google signing success','success')
           navigation.replace("VMD")
        }else{
          handleMessage('Google siging canceled','prueba')
        }
        setGoogleSubmitting(false);

      })
      .catch(error=>{
        console.log(error)
        handleMessage('A ocurrudo un error, verificar su red e intentar nuevamente ','prueba')
        setGoogleSubmitting(false);
       
      })

      const handleMessage =(message,type='failed') => {
        setMessage(message);
        setMessageType(type);
      };

  }
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      {!googleSubmitting && (
      <TouchableOpacity google={true} onPress={handleGoogleSigingIn}>
        <Fontisto name="google" size={25} style={styles.buttonTextGoogle} />
        <Text google={true}>Sing in with Google</Text>
      </TouchableOpacity>
      )}
      
      {googleSubmitting && (
      <TouchableOpacity google={true} disabled={true}>
        <ActivityIndicator size="large" color={primary} />
      </TouchableOpacity>
      )}


    </KeyboardAvoidingView>
  )
}

export default VisLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextGoogle: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})


