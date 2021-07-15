import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Button, ScrollView, SafeAreaView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import StoreCardItem from '../components/StoreCardItem'
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import { getCardCollection, getCardFeatured } from '../remote/Backend.api';

type Props = {
  item: any
  navigation: any
}

const ManageStore: React.FC<Props> = ({ navigation }) => {
 
  //TODO: Change to receive input from DB
  const [featuredCard, setFeaturedCard] = useState<string[]>([]);
  const [populatedFeaturedCard, setPopulatedFeaturedCard]  = useState<YGOCard[]>([]);
  
  const [cardList, setCardList] = useState<string[]>([]);
  const [populatedCards, setPopulatedCards]  = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const cards = await getCardFeatured();
      setFeaturedCard(cards); 
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

  useEffect(() => {
    (async () => {
      // TODO: get username from redux state for argument
      const cards = await getCardCollection('bob99');
      setCardList(cards); 
    })()
  },[])

  useEffect(() => {
    setPopulatedCards(cardList)
  },[cardList])


  const handleAddCard = () => {
    navigation.navigate('Add Stock')
  }

  const renderItem = ({ item }) => {
    return (
      <StoreCardItem
        cardName={item}
        onPress={() => navigation.navigate('Card Details', { navigation, item, setFeaturedCard })}
      />
    )
  }
      
  return (
    <ScrollView style={{flex: 1}}>
      <Banner text={'Store name'} />
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Add Stock'} functionality={() => handleAddCard()} />
      </View>
      {
        populatedFeaturedCard ?
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
        data={populatedCards}
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
