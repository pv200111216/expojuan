import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { conexion } from '../Control/Firebase';
import { storage } from '../Control/Firebase';

const VisConsultaAlumnos = (props) => {
  const [alumnos, setAlumnos] = useState([]);

  const mostrarAlumnos = async () => {
    try {
      const rsAlumnos = [];
      const querySnapshot = await conexion.collection('tblAlumnos').get();

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const {
          aluNC,
          aluNombre,
          aluApellidos,
          aluCorreo,
          aluTelefono,
          aluSexo,
          aluCarrera,
          aluFNac,
        } = data;

        let imageUrl = null;
        try {
          const storageRef = storage.ref(`photos/${aluNC}`);
          imageUrl = await storageRef.getDownloadURL();
        } catch (error) {
          console.log(`No se encontró imagen para ${aluNC}:`, error);
          imageUrl = 'https://via.placeholder.com/150';
        }

        rsAlumnos.push({
          id: doc.id,
          aluNC,
          aluNombre,
          aluApellidos,
          aluCorreo,
          aluTelefono,
          aluSexo,
          aluCarrera,
          aluFNac,
          imageUrl,
        });
      }

      setAlumnos(rsAlumnos);
    } catch (e) {
      Alert.alert('Error', 'Mensaje: ' + e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      mostrarAlumnos();
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <ScrollView>
      <Button
        title="Alta alumnos"
        onPress={() => props.navigation.navigate('VisAltaAlumno')}
      />
      {alumnos.map((alumno) => (
        <ListItem
          key={alumno.id}
          bottomDivider
          onPress={() =>
            props.navigation.navigate('VisEditarAlumno', {
              id: alumno.id,
            })
          }
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri: alumno.imageUrl || 'https://via.placeholder.com/150',
            }}
          />
          <ListItem.Content>
            <Text style={styles.label}>
              Nombre: <Text style={styles.value}>{alumno.aluNombre}</Text>
            </Text>
            <Text style={styles.label}>
              Apellidos: <Text style={styles.value}>{alumno.aluApellidos}</Text>
            </Text>
            <Text style={styles.label}>
              Número de Control: <Text style={styles.value}>{alumno.aluNC}</Text>
            </Text>
            <Text style={styles.label}>
              Correo: <Text style={styles.value}>{alumno.aluCorreo}</Text>
            </Text>
            <Text style={styles.label}>
              Teléfono: <Text style={styles.value}>{alumno.aluTelefono}</Text>
            </Text>
            <Text style={styles.label}>
              Sexo: <Text style={styles.value}>{alumno.aluSexo}</Text>
            </Text>
            <Text style={styles.label}>
              Carrera: <Text style={styles.value}>{alumno.aluCarrera}</Text>
            </Text>
            <Text style={styles.label}>
              Fecha de Nacimiento:{' '}
              <Text style={styles.value}>
                {new Date(alumno.aluFNac).toLocaleDateString('es-ES')}
              </Text>
            </Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default VisConsultaAlumnos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  filaCabecera: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: '90%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  filaForm: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2c77c7',
    width: '90%',
    height: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  estiloBoton: {
    width: '30%',
    height: '90%',
    backgroundColor: '#7ac72c',
    display: 'flex',
    borderRadius: 10,
  },
  estiloTextoBoton: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingTop: '8%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#555',
  },
});
