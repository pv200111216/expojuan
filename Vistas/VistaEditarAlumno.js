import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  Text,
  Image,
  Platform,
} from 'react-native';
import { conexion, storage } from '../Control/Firebase';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const VisEditarAlumno = (props) => {
  const [alumno, setAlumno] = useState({
    aluNC: '',
    aluNombre: '',
    aluApellidos: '',
    aluCorreo: '',
    aluTelefono: '',
    aluSexo: '',
    aluCarrera: '',
  });

  const [sexo, setSexo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const dataCarreras = [
    { label: 'Ingeniería en Sistemas', value: 'Ingeniería en Sistemas' },
    { label: 'Ingeniería en Gestión', value: 'Ingeniería en Gestión' },
    { label: 'Licenciatura en Turismo', value: 'Licenciatura en Turismo' },
    { label: 'Ingeniería en Electromecánica', value: 'Ingeniería en Electromecánica' },
    { label: 'Arquitectura', value: 'Arquitectura' },
    { label: 'Licenciatura en Gastronomía', value: 'Licenciatura en Gastronomía' },
  ];

  useEffect(() => {
    obtenerAlumnoPorId(props.route.params.id);
  }, [props.route.params.id]);

  const obtenerAlumnoPorId = async (id) => {
    try {
      const doc = await conexion.collection('tblAlumnos').doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        setAlumno({
          aluNC: data.aluNC || '',
          aluNombre: data.aluNombre || '',
          aluApellidos: data.aluApellidos || '',
          aluCorreo: data.aluCorreo || '',
          aluTelefono: data.aluTelefono || '',
          aluSexo: data.aluSexo || '',
          aluCarrera: data.aluCarrera || '',
        });
        setSexo(data.aluSexo || '');
        setCarrera(data.aluCarrera || '');

        let fecha;
        if (data.aluFNac) {
          fecha = new Date(data.aluFNac);
          if (isNaN(fecha.getTime())) {
            fecha = new Date();
          }
        } else {
          fecha = new Date();
        }
        setDate(fecha);

        const storageRef = storage.ref(`photos/${data.aluNC}`);
        try {
          const imageUrl = await storageRef.getDownloadURL();
          setImage(imageUrl);
        } catch (error) {
          setImage(null);
        }
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo obtener el alumno: ' + e.message);
    }
  };

  const handleChangeText = (field, value) => {
    setAlumno({ ...alumno, [field]: value });
  };

  const actualizarAlumno = async () => {
    if (
      alumno.aluNC === '' ||
      alumno.aluNombre === '' ||
      alumno.aluApellidos === '' ||
      alumno.aluCorreo === '' ||
      alumno.aluTelefono === '' ||
      carrera === '' ||
      sexo === '' ||
      !date
    ) {
      Alert.alert('Error', 'Favor de llenar todos los datos.');
    } else {
      try {
        if (imageChanged && image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const filename = `photos/${alumno.aluNC}`;
          const storageRef = storage.ref(filename);
          await storageRef.put(blob);
        }

        const updateData = {
          aluNC: alumno.aluNC,
          aluNombre: alumno.aluNombre,
          aluApellidos: alumno.aluApellidos,
          aluCorreo: alumno.aluCorreo,
          aluTelefono: alumno.aluTelefono,
          aluFNac: date.toISOString(),
          aluSexo: sexo,
          aluCarrera: carrera,
        };

        await conexion.collection('tblAlumnos').doc(props.route.params.id).update(updateData);

        Alert.alert('Éxito', 'Alumno actualizado correctamente', [
          {
            text: 'Aceptar',
            onPress: () => {
              props.navigation.navigate('VisConsultaAlumnos');
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al actualizar el alumno: ' + error.message);
      }
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permiso para acceder a la galería es necesario.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setImageChanged(true);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Número de Control</Text>
          <TextInput
            style={styles.entradas}
            placeholder='Escribe tu número de control'
            value={alumno.aluNC}
            onChangeText={(val) => handleChangeText('aluNC', val)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Nombre</Text>
          <TextInput
            style={styles.entradas}
            placeholder='Escribe tu nombre'
            value={alumno.aluNombre}
            onChangeText={(val) => handleChangeText('aluNombre', val)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Apellidos</Text>
          <TextInput
            style={styles.entradas}
            placeholder='Escribe tus apellidos'
            value={alumno.aluApellidos}
            onChangeText={(val) => handleChangeText('aluApellidos', val)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Correo</Text>
          <TextInput
            style={styles.entradas}
            placeholder='Escribe tu correo'
            value={alumno.aluCorreo}
            onChangeText={(val) => handleChangeText('aluCorreo', val)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Teléfono</Text>
          <TextInput
            style={styles.entradas}
            placeholder='Escribe tu teléfono'
            value={alumno.aluTelefono}
            onChangeText={(val) => handleChangeText('aluTelefono', val)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Sexo</Text>
          <RadioButtonGroup
            selected={sexo}
            onSelected={(value) => setSexo(value)}
            radioBackground="blue"
            containerStyle={styles.radioGroup}
          >
            <RadioButtonItem value="Masculino" label={<Text>Masculino</Text>} />
            <RadioButtonItem value="Femenino" label={<Text>Femenino</Text>} />
          </RadioButtonGroup>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Carrera</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataCarreras}
            search
            maxHeight={400}
            labelField="label"
            valueField="value"
            placeholder="Selecciona tu carrera"
            value={carrera}
            searchPlaceholder="Buscar..."
            onChange={(item) => setCarrera(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Fecha de Nacimiento</Text>
          <Button title='Seleccionar Fecha' onPress={showDatepicker} />
          <Text style={styles.fecha}>Fecha: {date.toLocaleDateString('es-ES')}</Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textos}>Foto</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>No se ha seleccionado ninguna imagen</Text>
          )}
          <Button title="Cambiar Foto" onPress={pickImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Actualizar" color="#348D68" onPress={actualizarAlumno} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VisEditarAlumno;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  textos: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  entradas: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  fecha: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
  },
});
