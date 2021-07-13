import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component';

const TradeItem: React.FC<unknown> = () => {

  const [offer, setOffer] = React.useState<YGOCard>();
  const [request, setRequest] = React.useState<YGOCard>();

  useEffect(() => {
    (async () => {
      const card1 = await getCardByName('Dark Magician');
      const card2 = await getCardByName('Blue-Eyes White Dragon');
      setOffer(card1.data[0]);
      setRequest(card2.data[0]);
    })();
  }, [])
  return (
    <ScrollView>
      <View>
        {/* <Image/> */}
        <Text>Swap with: {/* Insert other user */}</Text>
        <Text>Defense</Text>
        <Text>Level</Text>
        <Text>Attribute</Text>
        <Text>Swap card</Text>
       <CardDetailItemReusable data={offer} />
        <Text>Your card here</Text>
        <CardDetailItemReusable data={request} />
      </View>
      <View style={styles.controls}>
        <ButtonBlackWhite text="Accept" functionality= { () => {} }/>  {/*  TODO: add functionality */}
        <ButtonBlackWhite text="Reject" functionality= { () => {} }/>  {/*  TODO: add functionality */}
      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});


export default TradeItem;