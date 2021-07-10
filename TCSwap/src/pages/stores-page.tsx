import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';

const ViewStoresPage: React.FC<unknown> = () => {

  return (
    <View>
      <Text>View stores here</Text>
    </View >
  );
}

export default ViewStoresPage;