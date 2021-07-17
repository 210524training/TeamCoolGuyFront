import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import StoreCardItem from '../components/StoreCardItem'
import StoreDB from '../models/store';
import User from '../models/user';
import YGOCard from '../models/YGOCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { CollectionState, getCollectionAsync, selectCollection } from '../redux/slices/collection.slice';
import { getCardByName } from '../remote/apis/YGOapi';
import { getCardFeatured, getUsersStore } from '../remote/Backend.api';

type Props = {
  item: any
  navigation: any
}

const ManageStore: React.FC<Props> = ({ navigation }) => {
 
  //TODO: Change to receive input from DB
  const [featuredCard, setFeaturedCard] = useState<string[]>([]);
  const [populatedFeaturedCard, setPopulatedFeaturedCard]  = useState<YGOCard[]>([]);
  const [storeDB, setStoreDB] = useState<StoreDB>();

  const dispatch = useAppDispatch();

  const user: User = useAppSelector((state) => {
    return state.user as User
})

  const inventory = useAppSelector<CollectionState>(selectCollection) || [];
  console.log(inventory)

  useEffect(() => {
    
    (async () => {
      console.log('refresh')
      await dispatch(getCollectionAsync(user.username));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const currentStore: StoreDB[] | any = await getUsersStore(user.username)
      setStoreDB(currentStore[0])
      console.log(currentStore)
      const cards = await getCardFeatured(user.username);
      console.log('getfeaturedcardmanagestore', cards)
      if (cards.length > 0) {
        setFeaturedCard([cards[0].card_identifier]); 
      }
      
    })()
  },[])

  useEffect(() => {
    (async() => {
      const YGOCard = await getCardByName(featuredCard[0]);
      const condensedCard = {
        id: YGOCard.data[0].id,
        name: YGOCard.data[0].name,
        type: YGOCard.data[0].type,
        desc: YGOCard.data[0].desc,
        atk: YGOCard.data[0].atk,
        def: YGOCard.data[0].def,
        level: YGOCard.data[0].level,
        race: YGOCard.data[0].race,
        attribute: YGOCard.data[0].attribute,
        card_images: YGOCard.data[0].card_images,
        card_prices: YGOCard.data[0].card_prices,
      }
      setPopulatedFeaturedCard([condensedCard])
    }
  )()
  },[featuredCard])

  const handleAddCard = () => {
    navigation.navigate('Add Stock')
  }

  const renderItem = ({ item }) => {
    console.log('renderItem', item)
    return (
      <StoreCardItem
        cardName={item.card_identifier}
        onPress={() => navigation.navigate('Card Details', { navigation, item, setFeaturedCard })}
      />
    )
  }
      
  return (
    <ScrollView style={{flex: 1}}>
      <Banner text={storeDB?.storeName || ''} />
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Add Stock'} functionality={() => handleAddCard()} />
      </View>
      {
        populatedFeaturedCard.length > 0 ?
      <View>
        <Text style={styles.featured}>Featured Card</Text>
        <CardDetailItemReusable data={populatedFeaturedCard[0]} />
      </View>
        :
        <Text style={styles.featured}>Set a featured card to display here!</Text>
      }
      <View style={{flex: 1}}>
        <Text style={styles.featured}>Inventory</Text>
        <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
      </View>
    </ScrollView>
    
  );
}

export default ManageStore;

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  featured: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 30,
    borderBottomWidth: 4,
  }
});
