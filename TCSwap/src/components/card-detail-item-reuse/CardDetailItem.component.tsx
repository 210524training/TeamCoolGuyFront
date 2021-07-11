import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import YGOCard, { MonsterCard } from '../../models/YGOCard';
import HorizontialRuleWithText from '../HorizontialRuleWithText';
import styles from './CardDetailItem.styles';

type props = {
    data: any;
}

const CardDetailItemReusable: React.FC<props> = ({ data }) => {

  const [cardDetails, setCardDetails] = useState<YGOCard>();

  useEffect(() => {
    (async () => {
      setCardDetails(data);
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={{fontWeight: '700'}}>Store Options</Text>
        <HorizontialRuleWithText text='PRICE' />
        {
          cardDetails?.card_prices ? 
          <Text>{cardDetails && cardDetails?.card_prices[0].ebay_price }</Text> :
          <Text>None Listed</Text>
        }
        <HorizontialRuleWithText text='Featured' />
        <Text>Not Implemented Yet...</Text>
      </View>

      <View style={styles.container}>
      <Text style={{fontWeight: '700'}}>Card Info</Text>
        <Image
          style={styles.cardImage}
          source={{
            uri: cardDetails && cardDetails.card_images[0].image_url,
          }}
        />
        <HorizontialRuleWithText text='NAME' />
        <Text>{cardDetails && cardDetails.name}</Text>
        <HorizontialRuleWithText text='CARD TYPE' />
        <Text>{cardDetails && cardDetails.type}</Text>
        <HorizontialRuleWithText text='TYPE' />
        <Text>{cardDetails && cardDetails.race}</Text>
        {
          (cardDetails && cardDetails.type.includes('Monster')) ? 
            <>
            <HorizontialRuleWithText text='COMBAT' />
              <Text>Attack: {(cardDetails as MonsterCard).atk} / Defense: {(cardDetails as MonsterCard).def}</Text>
              <Text>Level: {(cardDetails as MonsterCard).level} / Attribute: {(cardDetails as MonsterCard).attribute}</Text>
            </> 
            : 
            <></>
        }
        <HorizontialRuleWithText text='DESCRIPTION' />
        <Text>{cardDetails && cardDetails.desc}</Text>
      </View >
    </>
  );
}

export default CardDetailItemReusable;
