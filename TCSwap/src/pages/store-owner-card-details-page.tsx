import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import StoreOptions from '../components/StoreOptions';

type Props = {
  route: any,
}

const StoreOwnerCardDetails: React.FC<Props>= ({ route }) => {
  const { card } = route.params;

  const handleSetFeaturedCard = () => {
    // TODO: move to card detailed page
  }

  const handleAdjustPrice = () => {
    // TODO: move to card detailed page
  }

  const handleRemove = () => {
    // TODO: move to card detailed page
  }

  return (
    <ScrollView style={styles.container}>
      <Banner text={card.name} />
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Set Featured'} functionality={() => handleSetFeaturedCard()} />
        <ButtonBlackWhite text={'Adjust Price'} functionality={() => handleAdjustPrice()} />
        <ButtonBlackWhite text={'Remove'} functionality={() => handleRemove()} />
      </View>
      <StoreOptions data={card} />
      <CardDetailItemReusable data={card} />
    </ScrollView>
  )
}

export default StoreOwnerCardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});