import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';

const MyCollectionPage: React.FC<unknown> = () => {

  return (
    <View>
      <Text>Nice collection!.</Text>
    </View >
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}); */

export default MyCollectionPage;