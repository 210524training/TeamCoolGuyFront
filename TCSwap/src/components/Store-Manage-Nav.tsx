import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import ManageStore from '../pages/Manage-Store';
import StoreOwnerCardDetails from '../pages/store-owner-card-details-page';

const ManageCardNavigator = createStackNavigator();

const ManageStackScreen = () => {
  return (
    <>
    <ManageCardNavigator.Navigator>
      <ManageCardNavigator.Screen name="Manage-Store" component={ManageStore} />
      <ManageCardNavigator.Screen name="Card-Details" component={StoreOwnerCardDetails} />
    </ManageCardNavigator.Navigator>
    </>
    
  )
}

export default ManageStackScreen
