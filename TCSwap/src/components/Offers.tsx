import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import DATA from '../../temp-card-data.json'
import Offer from '../models/Offer';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import TradeItem from './TradeItem';
import { getOffers } from '../remote/Backend.api'
import { User } from 'react-native-gifted-chat';
import { useAppDispatch, useAppSelector } from '../redux';
import { UserState, selectUser } from '../redux/slices/user.slice';



type Props = {
  item: any
  navigation: any
}

const Offers: React.FC<Props> = ({ navigation }) => {
  
  const [offers, setOffers] = useState<Offer[]>();

  const dispatch = useAppDispatch();

  const user = useAppSelector<UserState>(selectUser); 

  const handleOnPress = () => {
    navigation.navigate('Details');
  }

  const handleOffers = async () => {
    if(user) {
      const dbOffers = await getOffers(user.username);
      setOffers(dbOffers);
    }
  }

  useEffect(() => {
    (async () => {
      await handleOffers();
    })
  }, [])

  const renderItem = ({ item }) => {

    return (
      <TradeItem
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
            data={DATA}
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