/**
 * This file may be refactored to all all users to add to their collections
 * 
 * NOTICE: api call can return multiple cards, but this component will only grab the first card
 *         and can be refactored to show more than one.
 */

import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import { getCardByName } from '../remote/apis/YGOapi';
import YGOCard from '../models/YGOCard';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import { useEffect } from 'react';

type Props = { 
}

const AddStockPage: React.FC<Props> = () => {

  const [cardName, setCardName] = useState<string>('');
  const [YGOCardList, setYGOCardList] = useState<YGOCard[]>([]);
  const [YGOCard, setYGOCard] = useState<YGOCard[]>([]);

  useEffect(() => {
    setYGOCard([YGOCardList[0]])
  }, [YGOCardList])

  const handleSearch = async () => {
    const cards= await getCardByName(cardName);
    const condensedCard = {
      id: cards.data[0].id,
      name: cards.data[0].name,
      type: cards.data[0].type,
      desc: cards.data[0].desc,
      atk: cards.data[0].atk,
      def: cards.data[0].def,
      level: cards.data[0].level,
      race: cards.data[0].race,
      attribute: cards.data[0].attribute,
      card_images: cards.data[0].card_images,
      card_prices: cards.data[0].card_prices,
    }
    if(cards.data.length > 0) {
      setYGOCardList([condensedCard]);
    }
    
  }

  const handleAddToInventory = async () => {
    //TODO: Send card name to store-owner/user in database
    Alert.alert(
      "Card added to inventory!",
      "Kind of, add some more!",
      [
        {
          text: "Dismiss",
          onPress: () => Alert.alert("Dismiss Pressed"),
          style: "cancel",
        },
      ]
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Banner text={'Add Stock'} />
      <View style={{ width: '100%', padding: 25 }}>
        <Text >Enter Name of Card:</Text>
        <TextInput
          style={{ fontSize: 18, margin: 10, backgroundColor: 'white' }}
          placeholder="Dark Magician"
          onChangeText={text => setCardName(text)}
        />
        <View style={styles.controls}>
        <ButtonBlackWhite functionality={handleSearch} text="Search"/>
        </View>
      </View>
      {
        YGOCardList.length > 0 ? 
        <View>
          <CardDetailItemReusable data={YGOCard[0]} /> 
          <View style={styles.controls}>
            <ButtonBlackWhite text={'Confirm'} functionality={() => handleAddToInventory()} />
          </View>
        </View>
        : <></>
      }
    </ScrollView>
        
  );
}

export default AddStockPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});
