import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import StoreOptions from '../components/StoreOptions';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';

type Props = {
  route: any,
  navigation: any,
  setFeaturedCard: (value: React.SetStateAction<string[]>) => void,
}

const StoreOwnerCardDetails: React.FC<Props>= ({ route, navigation }) => {
  const { item, setFeaturedCard } = route.params;

  const [cardDetails, setCardDetails] = useState<YGOCard[]>([]);
  const [cardData, setCardData] = useState<YGOCard[]>([]);
  
  useEffect(() => {
    
    (async() => {
        const YGOCard = await getCardByName(item);
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
        setCardData([condensedCard])
      }
    )()
  }, [])

  useEffect(() => {
    setCardDetails(cardData)
  }, [cardData])

  const handleSetFeaturedCard = (card: YGOCard[]) => {
    // TODO: IMPLEMENT TO CHANGE IN DB
    setFeaturedCard([cardDetails[0].name])
    navigation.navigate('Manage Store', {card})
  }

  const handleRemove = () => {
    // TODO: IMPLEMENT TO REMOVE FROM DB
  }

  return (
    cardDetails.length > 0 ?
    <ScrollView style={styles.container}>
      <Banner text={cardDetails[0].name} />
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Set Featured'} functionality={() => handleSetFeaturedCard(cardDetails)} />
        <ButtonBlackWhite text={'Remove'} functionality={() => handleRemove()} />
      </View>
      <StoreOptions data={cardDetails[0]} />
      <CardDetailItemReusable data={cardDetails[0]} />
    </ScrollView>
    : <></>
  )
}

export default StoreOwnerCardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeOptions: {
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#d8d9d0",
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});