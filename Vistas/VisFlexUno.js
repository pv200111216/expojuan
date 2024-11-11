import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
const VisFlexUno = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filasTop}>
        <View style={styles.elementosTop}>
        <Text style={styles.elementoTop}>Flex 1 - Juan Carlos</Text>
        </View>
      </View>
      <View style={styles.filas}> 
        <View style={styles.elementos}>
        </View>
        <View style={styles.elementos}>
        </View>
        <View style={styles.elementos}>
        </View>
      </View>
      <View style={styles.filas}>
        <View style={styles.elementos}></View>
        <View style={styles.elementos}></View>
        <View style={styles.elementos}></View>
      </View>
      <View style={styles.filas}>
      <View style={styles.elementos}></View>
      <View style={styles.elementos}></View>
      <View style={styles.elementos}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  elementoTop:{
    fontFamily: 'sans-serif',
    color:'black',
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    margin:'auto'
  },
  filasTop:{
    flexDirection:'row',
    backgroundColor:'gray',
    alignItems:'center',
    justifyContent:'space-between',
    width:400,
    height:150,
  },
  elementosTop:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:350,
    height:100,
    marginLeft:25,
    borderWidth:5,
    borderColor:'white',
    borderStyle:'solid',
    opacity:0.8,
    borderRadius:10,
    backgroundColor:'lightgray',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filas:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:400,
    height:250,
    backgroundColor:'dimgray',
  },
  elementos:{
    width:100,
    height:170,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 5,
    borderColor:'white',
    borderStyle:'solid',
    opacity:0.7,
    borderRadius:11,
    backgroundColor:"#999",
  },
});
export default VisFlexUno