import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';
import styles from '../components/card-detail-item-reuse/CardDetailItem.styles';
import Banner from '../components/Banner';
import { getAllStores } from '../remote/Backend.api';
import store from '../redux/store';

type Props = { navigation: any }


const ViewStoresPage: React.FC<Props> = ({ navigation }) => {

  const [stores, setStores] = useState([

  ]);

  const [collection, setCollection] = useState([

  ]);

  useEffect(() => {
    (async () => {
      const data = await getAllStores()
      setStores(data)
    })()
  },[])
  useEffect(() => {
    setCollection(stores)
  },[stores])

  const pressHandler = (item: any) => {
    navigation.navigate('Inventory',{item});
  }

  return (

    <View /* style={styles.storesListStyle} */>
      <Banner text="Stores" />
      <FlatList
        data={collection}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => pressHandler(item)}>
            <Text style={[adFontes.storeText, styles.container]}>{item.storeName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );
}

const adFontes = StyleSheet.create({
  storeText: {
    fontSize: 20,
    fontWeight: "500",
  }
});

export default ViewStoresPage;

