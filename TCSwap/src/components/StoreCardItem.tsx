import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';

type Props = {
  cardName: string,
  onPress: () => {},
}

const StoreCardItem: React.FC<Props> = ({ cardName, onPress }) => {

  const [cardData, setCardData] = useState<YGOCard[]>([])
  const [inventory, setInventory ] = useState<YGOCard[]>([]);

  useEffect(() => {

    (async() => {
        const YGOCard = await getCardByName(cardName);
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
    setInventory(cardData)
  }, [cardData])

  return (
    inventory.length ?
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Image
          style={styles.tinyLogo}
          // source={require('../assets/yugioh-card-back.png')}
          source={{
            uri: inventory[0].card_images[0].image_url_small
          }}
          />
        <View style={styles.details}>
          <Text style={[styles.title]}>{inventory[0].name}</Text>
          <Text style={[styles.price]}>${inventory[0].card_prices ? inventory[0].card_prices[0].ebay_price : null}</Text>
        </View>
    </TouchableOpacity>
    : <></>
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
