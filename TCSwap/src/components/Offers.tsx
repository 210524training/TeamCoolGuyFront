import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import DATA from '../../temp-card-data.json'
import Offer from '../models/Offer';
import { useAppSelector } from '../redux';
import { UserState, selectUser } from '../redux/slices/user.slice';
import { getOffers } from '../remote/Backend.api';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import PlayerCardItem from './PlayerCardItem'



type Props = {
  item: any
  navigation: any
}

const Offers: React.FC<Props> = ({ navigation }) => {
  const [offers, setOffers] = React.useState<Offer[]>();

  const user = useAppSelector<UserState>(selectUser);

  const handleOnPress = () => {
    navigation.navigate('Details');
  }

  useEffect(() => {
    (async () => {
      if(user) {
        const data = await getOffers(user.username)
        setOffers(data)
      }
    })()
  },[])

  const renderItem = ({ item }) => {

    return (
      <PlayerCardItem
        item={item}
        onPress={handleOnPress}
        navigation={ navigation }
      />
    );
  };

  return (
    <>
      <View>
          <FlatList 
            data={offers}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          >
          </FlatList>
      </View>
    </>
    
  );
}

export default Offers;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});