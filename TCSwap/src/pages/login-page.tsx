import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { useNavigation } from '@react-navigation/native';

type Props = { navigation: any }

const LoginPage: React.FC<Props> = ({ navigation }) => {

  return (
        <View>
                <Text>Hello! Welcome to our login page.</Text>
                <Button
                  title="Log in"
                  onPress={() => navigation.navigate('Players')}>Log in
                </Button>
                <Button
                  title="Store owner? Log in here"
                  onPress={() => navigation.navigate('Store Owners')}>Log in
                </Button>
        </View>
  );
}

export default LoginPage;
