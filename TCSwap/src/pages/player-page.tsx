import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TradePage from './trade-page';
import MyCollectionPage from './player-colleciton-page';

const PlayerPage: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
          <Tab.Screen name="Trades" component={TradePage} />
          <Tab.Screen name="My Collection" component={MyCollectionPage} />
      </Tab.Navigator>
    </>
  );
}

export default PlayerPage;