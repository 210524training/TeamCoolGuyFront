import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import YGOCard, { MonsterCard, YGOCARD_HEIGHT, YGOCARD_WIDTH } from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';

const IMAGE_SCALE = 5;

const styles = StyleSheet.create ({
  cardImage: {
    width: YGOCARD_WIDTH*IMAGE_SCALE,
    height: YGOCARD_HEIGHT*IMAGE_SCALE,
  },
})

type props = {
    route: any;
}

const CardDetailItem: React.FC<props> = ({route}) => {

  const { cardName } = route.params;

  const [cardDetails, setCardDetails] = useState<YGOCard>();

  useEffect(() => {
    (async () => {
      const card = await getCardByName(cardName);
      setCardDetails(card.data[0]);
    })();
  }, []);

  return (
    <View>
      <Image
        style={styles.cardImage}
        source={{
          uri: cardDetails && cardDetails.card_images[0].image_url,
        }}
      />
      <Text>Name: {cardDetails && cardDetails.name}</Text>
      <Text>Card Type: {cardDetails && cardDetails.type}</Text>
      <Text>Type: {cardDetails && cardDetails.race}</Text>
      {
        (cardDetails && cardDetails.type.includes('Monster')) ? 
          <>
            <Text>Attack: {(cardDetails as MonsterCard).atk}</Text>
            <Text>Defense: {(cardDetails as MonsterCard).def}</Text>
            <Text>Level: {(cardDetails as MonsterCard).level}</Text>
            <Text>Attribute: {(cardDetails as MonsterCard).attribute}</Text>
          </> 
          : 
          <></>
      }
      <Text>Description: {cardDetails && cardDetails.desc}</Text>
    </View >
  );
}

export default CardDetailItem;
