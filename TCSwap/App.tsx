import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginPage from './src/pages/login-page';
import RegisterPage from './src/pages/register-page';
import PlayerPage from './src/pages/player-page';
import StoreOwnerPage from './src/pages/store-owner-page';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import ViewStoresPage from './src/pages/stores-page';
import Collection from './src/components/Collection';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Players" component={PlayerPage} />
          <Stack.Screen name="Store Owners" component={StoreOwnerPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
