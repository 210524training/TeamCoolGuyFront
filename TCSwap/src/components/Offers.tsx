import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import DATA from '../../temp-card-data.json'
import Offer from '../models/Offer';
import { useAppSelector } from '../redux';
import { UserState, selectUser } from '../redux/slices/user.slice';
import { getOffers } from '../remote/Backend.api';
import styles from '../components/card-detail-item-reuse/CardDetailItem.styles';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import PlayerCardItem from './PlayerCardItem'



type Props = {
  item: any,
  navigation: any
}

const Offers: React.FC<Props> = ({ navigation }) => {
  const [offers, setOffers] = React.useState<Offer[]>();

  const user = useAppSelector<UserState>(selectUser);

  const handleOnPress = (trade: Offer) => {
    navigation.navigate('Details', { trade });
  }

  useEffect(() => {
    (async () => {
      if(user) {
        const data = await getOffers(user.username)
        setOffers(data)
      }
    })()
  },[])

  return (
    <>
      <View>
          <FlatList 
            data={offers}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOnPress(item)}>
                <Text style={[adFontes.text, styles.container]}>{item.requestor}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          >
          </FlatList>
      </View>
    </>
    
  );
}

export default Offers;

const adFontes = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "500",
  }
});