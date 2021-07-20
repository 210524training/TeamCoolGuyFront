import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import DATA from '../../temp-card-data.json'
import Offer from '../models/Offer';
import { useAppSelector } from '../redux';
import { UserState, selectUser } from '../redux/slices/user.slice';
import { getRequests } from '../remote/Backend.api';
import styles from '../components/card-detail-item-reuse/CardDetailItem.styles';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import PlayerCardItem from './PlayerCardItem'



type Props = {
  item: any
  navigation: any
}

const Requests: React.FC<Props> = ({ navigation }) => {
  const [requests, setRequests] = React.useState<Offer[]>();

  const user = useAppSelector<UserState>(selectUser);

  const handleOnPress = () => {
    navigation.navigate('Details');
  }

  useEffect(() => {
    (async () => {
      if(user) {
        const data = await getRequests(user.username)
        setRequests(data)
      }
    })()
  },[])

  return (
    <>
      <View>
          <FlatList 
            data={requests}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOnPress}>
                <Text style={[adFontes.text, styles.container]}>{item.decider}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item.id)}
          >
          </FlatList>
      </View>
    </>
    
  );
}

export default Requests;

const adFontes = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "500",
  }
});