import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/CardDetailItem(reusable)/CardDetailItem.reuseable';

type Props = {
  route: any,
}

const StoreOwnerCardDetails: React.FC<Props>= ({ route }) => {
  const { card } = route.params;

  console.log(card);

  

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