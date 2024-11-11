import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const VisGPS = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latitud: {location.coords.latitude}</Text>
      <Text style={styles.text}>Longitud: {location.coords.longitude}</Text>
      <Button
        title="Ver en Mapa"
        onPress={() =>
          navigation.navigate('VisMapa', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        }
      />
    </View>
  );
};

export default VisGPS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
