import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';

import VisInicio from './VisInicio';
import VisConsultaAlumnos from './VisConsultaAlumnos';
import VisGPS from './VisGPS';
import VisGrafica from './VisGrafica';
import VisFlexUno from './VisFlexUno';
import VisEditarAlumno from './VistaEditarAlumno';
import VisMapa from './VisMapa';
import VisAltaAlumnos from './VisAltaAlumno';
import VisFoto from './VisFoto';

const DrawerApp = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        statusBarcolor: '#0163d2',
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitle: 'App de Alumnos',
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="VisInicio"
        component={VisInicio}
        options={{
          title: 'Home',
          drawerIcon: (config) => <Icon size={23} name="home" />,
        }}
      />
      <Drawer.Screen name="VisAltaAlumno" component={VisAltaAlumnos} options={{drawerItemStyle:{display:'none'}}}/>
      <Drawer.Screen name="VisEditarAlumno" component={VisEditarAlumno} options={{drawerItemStyle:{display:'none'}}}/>
      <Drawer.Screen
        name="VisGPS"
        component={VisGPS}
        options={{
          title: 'GPS',
          drawerIcon: (config) => <Icon size={23} name="location-pin" />,
        }}
      />
      <Drawer.Screen
        name="VisGrafica"
        component={VisGrafica}
        options={{
          title: 'Gráfica',
          drawerIcon: (config) => <Icon size={23} name="bar-graph" />,
        }}
      />
      <Drawer.Screen
        name="VisConsultaAlumnos"
        component={VisConsultaAlumnos}
        options={{
          title: 'Consulta Alumnos',
          drawerIcon: (config) => <Icon size={23} name="list" />,
        }}
      />
      <Drawer.Screen
        name="VisAltaAlumnos"
        component={VisAltaAlumnos}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      {/* <Drawer.Screen
        name="VisEditarAlumno"
        component={VisEditarAlumno}
        options={{
          title: 'Editar Alumnos',
          drawerIcon: (config) => <Icon size={23} name="edit" />,
        }}
      /> */}
      <Drawer.Screen
        name="VisFlexUno"
        component={VisFlexUno}
        options={{
          title: 'Flex Uno',
          drawerIcon: (config) => <Icon size={23} name="box" />,
        }}
      />
      <Drawer.Screen
        name="VisMapa"
        component={VisMapa}
        options={{
          title: 'Mapa',
          drawerIcon: (config) => <Icon size={23} name="map" />,
        }}
      />
      <Drawer.Screen
        name="VisFoto"
        component={VisFoto}
        options={{
          title: 'Foto',
          drawerIcon: (config) => <Icon size={23} name="camera" />,
        }}
      />
    </Drawer.Navigator>
  );
};

function VisMenuDrawer() {
  return <DrawerApp />;
}

export default VisMenuDrawer;
