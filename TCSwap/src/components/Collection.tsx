import React, { useEffect } from 'react';
import { Pressable, Text, StyleSheet, View, ScrollView } from 'react-native';
import DBCard from '../models/DBCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { getCollectionAsync, selectCollection } from "../redux/slices/collection.slice";
import { selectUser, UserState } from '../redux/slices/user.slice';
import Banner from './Banner';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';

type props = {
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const dispatch = useAppDispatch();
  const collection = useAppSelector<DBCard[]>(selectCollection) || [];
  const user = useAppSelector<UserState>(selectUser);

  useEffect(() => {
    (async () => {
      if(user) {
        await dispatch(getCollectionAsync(user.username));
      }
    })();
  }, [user]);

  const buttons: JSX.Element[] = collection.map<JSX.Element>((card) => {
    
    return (
    <Pressable onPress={() => { props.navigation.navigate('Card Info', { cardName: card.card_identifier }); } }
               style = {styles.item}
               key = {card.card_identifier}>
      <View style={styles.details} key = {card.card_identifier}>
        <Text style={[styles.title]} key = {card.card_identifier}>
          {card.card_identifier}
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
