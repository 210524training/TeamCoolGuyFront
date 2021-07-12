import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';
// import { styles } from '../components/button-black-white/ButtonBlackWhite.styles';

type Props = { navigation: any }


const ViewStoresPage: React.FC<Props> = ({ navigation }) => {

  const [stores, setStores] = useState([
    { name: 'GameStop', id: '1', desc: 'The best store' },
    { name: 'Tappers Retro', id: '2', desc: 'The best store' },
    { name: 'Rainy Day', id: '3', desc: 'The best store' },
    { name: 'Black Ops', id: '4', desc: 'The best store' },
    { name: 'Guardian', id: '5', desc: 'The best store' },
  ]);

  const pressHandler = (id: string) => {
    navigation.navigate('Collection');
  }

  return (

    <View style={styles.storesListStyle}>

      <FlatList
        keyExtractor={(item) => item.id}
        data={stores}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => pressHandler(item.id)}>
            <Text style={styles.storeStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  storesListStyle: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  storeStyle: {
    padding: 30,
    backgroundColor: 'orange',
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 20,

  }
});

export default ViewStoresPage;

