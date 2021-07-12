import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import YGOCard, { MonsterCard } from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import Banner from './Banner';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component';

type props = {
    route: any;
}

const ScrollableCardDisplay: React.FC<props> = ({route}) => {

  const { cardName } = route.params;

  const [cardDetails, setCardDetails] = useState<YGOCard>();

  useEffect(() => {
    (async () => {
      const card = await getCardByName(cardName);
      setCardDetails(card.data[0]);
    })();
  }, []);

  return (
    <ScrollView style={scrollStyle.container}>
      <Banner text={(cardDetails && cardDetails.name) || ''} />
      <CardDetailItemReusable data={cardDetails}/>

    </ScrollView>
  );
}

const scrollStyle = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default ScrollableCardDisplay;
