import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from '../components/card-detail-item-reuse/CardDetailItem.styles';
import Banner from '../components/Banner';
import { getAllStores } from '../remote/Backend.api';
import Store  from '../models/store';

type Props = { 
  navigation: any
}


const ViewStoresPage: React.FC<Props> = ({ navigation }) => {

  const [stores, setStores] = useState<Store[]>([]);
  const [collection, setCollection] = useState<Store[]>([]);

  useEffect(() => {
    (async () => {
      const data: Store[] = await getAllStores()
      setStores(data)
      console.log(data)
    })()
  },[])
  useEffect(() => {
    setCollection(stores)
  },[stores])

  const pressHandler = (item: any) => {
    navigation.navigate('Inventory',{item});
  }

  return (

    <View>
      <Banner text="Stores" />
      <FlatList
        data={collection}
        keyExtractor={item => item.storeOwner}
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

