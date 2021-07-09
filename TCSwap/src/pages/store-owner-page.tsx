import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, StatusBar } from 'react-native';
import ManageStore from './Manage-Store';
import Messenger from './Messenger';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import StoreOwnerCardDetails from './store-owner-card-details-page';
import ManageStackScreen from '../components/Store-Manage-Nav';

const StoreOwnerPage: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();
  
  return (
    <>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Manage') {
            iconName = 'hammer';
          } else if (route.name === 'Messages') {
            iconName = 'mail';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
          <Tab.Screen name="Manage" component={ManageStackScreen} />
          <Tab.Screen name="Messages" component={Messenger} />
      </Tab.Navigator>
    </>
  );
}

export default StoreOwnerPage;