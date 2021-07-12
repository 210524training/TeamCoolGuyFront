import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';

type Props = {
  card: any,
  onPress: any,
}

const StoreCardItem: React.FC<Props> = ({ card, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image
          style={styles.tinyLogo}
          source={{
            uri: card.card_images[0].image_url_small,
          }}
        />
        <View style={styles.details}>
          <Text style={[styles.title]}>{card.name}</Text>
          <Text style={[styles.price]}>${card.card_prices ? card.card_prices[0].ebay_price : null}</Text>
        </View>
    </TouchableOpacity>
  )
  
  
};

export default StoreCardItem

const styles = StyleSheet.create ({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#d8d9d0",
  },
  title: {
    fontSize: 26,
  },
  tinyLogo: {
    width: 50,
    height: 75,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
  }
})
