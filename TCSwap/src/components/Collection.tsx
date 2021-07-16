import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, ScrollView } from 'react-native';
import DBCard from '../models/DBCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { CollectionState, getCollectionAsync, selectCollection } from "../redux/slices/collection.slice";
import Banner from './Banner';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';

type props = {
    collection: Array<string>,
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const dispatch = useAppDispatch();
  const collection = useAppSelector<any>(selectCollection) || [];

  const [cardCollection, setCardCollection] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await dispatch(getCollectionAsync('bob99'));
    })();
  }, []);

  //adding to fix user login the collection now returns array of card objects
  //{id: 8, card_owner: "billyman123", card_identifier: "Akashic Magician", game: "Yu-Gi-Oh!", condition: "Mint", …}
  //making function to get an array of card names, change as you wish

  const extractCardNames = (Objs: DBCard[]) => {
    const cardNames: string[] = [];
    Objs.forEach(card => {
      cardNames.push(card.card_identifier);
    })
    console.log(cardNames)
    return cardNames;
  }

  const buttons: JSX.Element[] = extractCardNames(collection).map<JSX.Element>((cardName) => {
    
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
      <ScrollView style={styles.container}>
        <Banner text = 'Player Name'/>
        {buttons}
        <View style={styles.controls}>
          <ButtonBlackWhite text='Add a card' functionality={() => {props.navigation.navigate('Add Card Page')}}/>
        </View>
      </ScrollView>
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  container: {
    flex: 1
  },
})

export default Collection;
