import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VisInicio = (props) => {
  return (
    <ImageBackground
        source={require('../imagenes/fondo.png')}
        style={styles.background}>
        <View style={styles.container}>

        </View>
    </ImageBackground>
  )
}



const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default VisInicio