import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Button, ScrollView, SafeAreaView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import StoreCardItem from '../components/StoreCardItem'
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import { getCardCollection } from '../remote/Backend.api';

type Props = {
  item: any
  navigation: any
}

const ManageStore: React.FC<Props> = ({ navigation }) => {

  const [inventory, setInventory ] = useState<YGOCard[]>([]);
  const [cardList, setCardList] = useState<string[]>([]);
  const [testCard, setTestCard] = useState<YGOCard[]>([])

  

  useEffect(() => {
    (async () => {
      const cards = await getCardCollection();
      setCardList(cards); 
    })()
  },[])

  useEffect(() => {
    (async() => {
      if(cardList.length > 0) {
        const card = await getCardByName(cardList[0]);
        const condensedCard = {
          id: card.data[0].id,
          name: card.data[0].name,
          type: card.data[0].type,
          desc: card.data[0].desc,
          atk: card.data[0].atk,
          def: card.data[0].def,
          level: card.data[0].level,
          race: card.data[0].race,
          attribute: card.data[0].attribute,
          card_images: card.data[0].card_images,
          card_prices: card.data[0].card_prices,
        }
        setTestCard([condensedCard])
      }
      
     })()
   }, [cardList])

  useEffect(() => {
    (async () => {
      let temp: YGOCard[] = []
      if(cardList.length > 0) {
        cardList.forEach(async (cardName) => {
          if(cardName) {
            const card = await getCardByName(cardName);
            const condensedCard = {
              id: card.data[0].id,
              name: card.data[0].name,
              type: card.data[0].type,
              desc: card.data[0].desc,
              atk: card.data[0].atk,
              def: card.data[0].def,
              level: card.data[0].level,
              race: card.data[0].race,
              attribute: card.data[0].attribute,
              card_images: card.data[0].card_images,
              card_prices: card.data[0].card_prices,
            }
            temp.push(condensedCard)
          }
        })
      }
      setInventory(temp)
      
    })();
  }, [cardList]);

  const handleAddCard = () => {
    // TODO:
  }

  // FIX: Currently renders array with one item 'testCard' but will not render with array with multiple items 'inventory'
  const mapCardsToStoreCardItem = testCard.map((card, index) => {
    return (
      <StoreCardItem
        card={card}
        onPress={() => navigation.navigate('Card Details', {card})}
        key={index}
      />
    )
  })
      
  return (
    <View style={{flex: 1}}>
      <Banner text={'Store name'} />
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Add Stock'} functionality={() => handleAddCard()} />
      </View>
      <View style={{flex: 1}}>
        {mapCardsToStoreCardItem}
      </View>
    </View>
    
  );
}

export default ManageStore;

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});
