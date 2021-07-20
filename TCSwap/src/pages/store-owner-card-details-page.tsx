import React, { SetStateAction, useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { User } from 'react-native-gifted-chat';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import StoreOptions from '../components/StoreOptions';
import YGOCard from '../models/YGOCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { getCollectionAsync } from '../redux/slices/collection.slice';
import { getCardByName } from '../remote/apis/YGOapi';
import { postFeaturedCard, removeCardFromCollections } from '../remote/Backend.api';

type Props = {
  route: any,
  navigation: any,
}

const StoreOwnerCardDetails: React.FC<Props>= ({ route, navigation }) => {
  const dispatch = useAppDispatch(); 
  const { item, setFeaturedCard, user } = route.params;

  const [cardDetails, setCardDetails] = useState<YGOCard[]>([]);
  const [cardData, setCardData] = useState<YGOCard[]>([]);
  
  useEffect(() => {
    
    (async() => {
        const YGOCard = await getCardByName(item.card_identifier);
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
    postFeaturedCard('Robert`s Emporium of Cards', item.id)
    setFeaturedCard([cardDetails[0].name])
    navigation.navigate('Manage Store', {card})
  }

  const handleRemove = async () => {
    const res = await removeCardFromCollections(user.username, item)
    console.log(res)
    await dispatch(getCollectionAsync(user.username));
    navigation.navigate('Manage Store')
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

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
