// App.js
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Crear el Stack Navigator
const Stack = createStackNavigator();

// Importar tus pantallas
import VisFlexUno from './Vistas/VisFlexUno';
import VisGrafica from './Vistas/VisGrafica';
import VisMenuDrawer from './Vistas/VisMenuDrawer';
import VisLogin from './Vistas/VisLogin';
import VisMapa from './Vistas/VisMapa'; // Asegúrate de que la ruta es correcta

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="VKL">
      <Stack.Screen 
        name='VKL' 
        component={VisLogin} 
        options={{ title: 'Vista Login' }}
      />
      <Stack.Screen 
        name='VMD' 
        component={VisMenuDrawer} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name='VF1' 
        component={VisFlexUno} 
        options={{ title: 'Practica Flex 1' }}
      />
      <Stack.Screen 
        name='VGrafica' 
        component={VisGrafica} 
        options={{ title: 'Grafica' }}
      />
      <Stack.Screen 
        name='VisMapa' 
        component={VisMapa} 
        options={{ title: 'Mapa' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;
