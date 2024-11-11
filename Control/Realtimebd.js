import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import firebase from './Datos/Firebase';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = firebase.database();
    const reference = database.ref('/Raiz/temperatura');

    const onDataChange = snapshot => {
      const dataArray = [];
      snapshot.forEach(childSnapshot => {
        dataArray.push({
          key: childSnapshot.key,
          valor:childSnapshot.val(),
        });
      });
      setData(dataArray);
      setLoading(false);
    };

    reference.on('value', onDataChange);

    // Cleanup subscription on unmount
    return () => reference.off('value', onDataChange);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
       <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text style={{padding:30}}>{item.key}: {JSON.stringify(item)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default App;