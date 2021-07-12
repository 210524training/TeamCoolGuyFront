import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, Image } from 'react-native';
import { getCardCollection } from '../remote/Backend.api';
import Banner from './Banner';

type props = {
    collection: Array<string>,
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const [cardCollection, setCardCollection] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const collectionStrings = await getCardCollection();
      setCardCollection(collectionStrings);
    })();
  }, []);

  const buttons: JSX.Element[] = cardCollection.map<JSX.Element>((cardName) => {
    return (
    <Pressable onPress={() => { props.navigation.navigate('Card Info', {cardName}); } }
               style = {styles.item}
               key = {cardName}>
      <View style={styles.details} key = {cardName}>
        <Text style={[styles.title]} key = {cardName}>
          {cardName}
        </Text>
      </View>
    </Pressable>)
  })

  return (
    <>
      <Banner text = 'Player Name'/>
      {buttons}
    </>
  );
}

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

export default Collection;
