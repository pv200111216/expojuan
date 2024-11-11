import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { database } from '../Control/Firebase'; // Asegúrate de que esta ruta sea correcta
import { LineChart } from 'react-native-chart-kit';

const VisGrafica = () => {
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [humedadData, setHumedadData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reference = database.ref('/Raiz'); // Usa el objeto database directamente

    const onDataChange = snapshot => {
      const tempArray = [];
      const humedadArray = [];
      const labelArray = [];

      snapshot.forEach(childSnapshot => {
        const record = childSnapshot.val();
        if (record.temperatura !== undefined && record.humedad !== undefined) {
          tempArray.push(record.temperatura);
          humedadArray.push(record.humedad);
          labelArray.push(new Date().toLocaleTimeString());
        }
      });

      setTemperaturaData(tempArray);
      setHumedadData(humedadArray);
      setLabels(labelArray);
      setLoading(false);
    };

    reference.on('value', onDataChange);

    // Cleanup subscription on unmount
    return () => reference.off('value', onDataChange);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  const maxDataPoints = 20; // Por ejemplo, mostrar los últimos 20 registros
  const displayedTemperatura = temperaturaData.slice(-maxDataPoints);
  const displayedHumedad = humedadData.slice(-maxDataPoints);
  const displayedLabels = labels.slice(-maxDataPoints).map((label, index) => `#${index + 1}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Temperatura y Humedad Registradas</Text>
      <LineChart
        data={{
          labels: displayedLabels,
          datasets: [
            {
              data: displayedTemperatura,
              color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // color para temperatura
              label: "Temperatura"
            },
            {
              data: displayedHumedad,
              color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // color para humedad
              label: "Humedad"
            }
          ]
        }}
        width={Dimensions.get('window').width - 32} // Ajustar el ancho según el dispositivo
        height={400}
        yAxisLabel=""
        yAxisSuffix="°C"
        yAxisInterval={1} // opcional, por defecto es 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#551A7C",
          backgroundGradientTo: "#143481",
          decimalPlaces: 2, // opcional, por defecto es 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#CA3C2D"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Text style={styles.footer}>Datos obtenidos de Firebase Realtime Database</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16
  },
  footer: {
    marginTop: 16,
    fontSize: 12,
    color: '#555'
  }
});

export default VisGrafica;
