// Vistas/VisMapa.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from 'expo-location';

const VisMapa = () => { 
  // Estado para la ubicación actual del usuario
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Definir la ubicación de destino (tu casa)
  const homeLocation = {
    latitude: 20.625477843122148, // Cambia estos valores por las coordenadas de tu casa
    longitude: -105.21305159199221,
  };

  useEffect(() => {
    (async () => {
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        Alert.alert('Permiso de ubicación denegado', 'Necesitamos acceso a tu ubicación para mostrar la ruta en el mapa.');
        return;
      }

      // Obtener la ubicación actual
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Suscribirse a cambios de ubicación en tiempo real (opcional)
      // Puedes descomentar el siguiente bloque si deseas actualizar la ubicación en tiempo real
      /*
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          setCurrentLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
      */
    })();
  }, []);

  // Manejar el caso donde no se obtienen las coordenadas de destino
  // En este caso, el destino es fijo, así que no es necesario verificar
  // pero podrías añadir validaciones si el destino es dinámico.

  // Manejar el caso donde no se ha obtenido la ubicación actual aún
  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* Marcador para la ubicación actual */}
        <Marker 
          coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} 
          title="Tu ubicación" 
        />

        {/* Marcador para la casa, con color rojo */}
        <Marker
          coordinate={homeLocation}
          title="Casa"
          pinColor="red"
        />

        {/* Línea roja entre la ubicación actual y la casa */}
        <Polyline
          coordinates={[
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            homeLocation,
          ]}
          strokeColor="red" // Color de la línea
          strokeWidth={3} // Grosor de la línea
        />
      </MapView>
    </View>
  );
};

export default VisMapa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
