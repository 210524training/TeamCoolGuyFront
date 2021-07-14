import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, Image, ScrollView } from 'react-native';
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from '../redux';
import { CollectionState, getCollectionAsync, selectCollection } from '../redux/slices/collection.slice';
=======
>>>>>>> 234eee08ce1895986597acdc36caab46f3517367
import { getCardCollection } from '../remote/Backend.api';
import Banner from './Banner';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';

type props = {
    collection: Array<string>,
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const dispatch = useAppDispatch();
  const collection = useAppSelector<CollectionState>(selectCollection) || [];

  const [cardCollection, setCardCollection] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await dispatch(getCollectionAsync({}));
    })();
  }, []);

  const buttons: JSX.Element[] = collection.map<JSX.Element>((cardName) => {
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
