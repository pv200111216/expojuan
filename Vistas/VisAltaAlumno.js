import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  Platform,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { conexion, storage } from '../Control/Firebase';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const VisAltaAlumno = (props) => {
  const [state, setState] = useState({
    aluNC: '',
    aluNombre: '',
    aluApellidos: '',
    aluCorreo: '',
    aluTelefono: '',
  });

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const [sexo, setSexo] = useState('Masculino');

  const [carrera, setCarrera] = useState('');

  const dataCarreras = [
    { label: 'Ingeniería en Sistemas', value: 'Ingeniería en Sistemas' },
    { label: 'Ingeniería en Gestión', value: 'Ingeniería en Gestión' },
    { label: 'Licenciatura en Turismo', value: 'Licenciatura en Turismo' },
    { label: 'Ingeniería en Electromecánica', value: 'Ingeniería en Electromecánica' },
    { label: 'Arquitectura', value: 'Arquitectura' },
    { label: 'Licenciatura en Gastronomía', value: 'Licenciatura en Gastronomía' },
  ];

  const [image, setImage] = useState(null);

  const guardarAlumno = async () => {
    if (
      state.aluNC === '' ||
      state.aluNombre === '' ||
      state.aluApellidos === '' ||
      state.aluCorreo === '' ||
      state.aluTelefono === '' ||
      carrera === '' ||
      sexo === '' ||
      !date ||
      !image
    ) {
      Alert.alert('Error', 'Favor de llenar todos los datos y seleccionar una imagen');
    } else {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = `photos/${state.aluNC}`;
        const storageRef = storage.ref(filename);
        await storageRef.put(blob);

        await conexion.collection('tblAlumnos').add({
          aluNC: state.aluNC,
          aluNombre: state.aluNombre,
          aluApellidos: state.aluApellidos,
          aluCorreo: state.aluCorreo,
          aluTelefono: state.aluTelefono,
          aluFNac: date.toISOString(),
          aluSexo: sexo,
          aluCarrera: carrera,
        });
        Alert.alert('Éxito', 'Alumno guardado exitosamente', [
          {
            text: 'Aceptar',
            onPress: () => {
              props.navigation.navigate('VisConsultaAlumnos');
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al guardar el alumno: ' + error.message);
      }
    }
  };

  const handleChangeText = (field, value) => {
    setState({ ...state, [field]: value });
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
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Número de Control</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu número de control"
            onChangeText={(value) => handleChangeText('aluNC', value)}
            value={state.aluNC}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre"
            onChangeText={(value) => handleChangeText('aluNombre', value)}
            value={state.aluNombre}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Apellidos</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tus apellidos"
            onChangeText={(value) => handleChangeText('aluApellidos', value)}
            value={state.aluApellidos}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu correo electrónico"
            onChangeText={(value) => handleChangeText('aluCorreo', value)}
            value={state.aluCorreo}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu número de teléfono"
            onChangeText={(value) => handleChangeText('aluTelefono', value)}
            value={state.aluTelefono}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Sexo</Text>
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
          <Text style={styles.textLabel}>Carrera</Text>
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
          <Text style={styles.textLabel}>Fecha de Nacimiento</Text>
          <Button title="Seleccionar Fecha" onPress={showDatepicker} />
          <Text style={styles.dateText}>Fecha: {date.toLocaleDateString('es-ES')}</Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.textLabel}>Foto</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>No se ha seleccionado ninguna imagen</Text>
          )}
          <Button title="Seleccionar Foto" onPress={pickImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Guardar" color="#348D68" onPress={guardarAlumno} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VisAltaAlumno;

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
  textLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
});
