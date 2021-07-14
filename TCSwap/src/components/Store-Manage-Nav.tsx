import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManageStore from '../pages/Manage-Store';
import AddStockPage from '../pages/store-owner-add-stock-page';
import StoreOwnerCardDetails from '../pages/store-owner-card-details-page';

const ManageCardNavigator = createStackNavigator();

const ManageStackScreen = () => {
  return (
    <>
    <ManageCardNavigator.Navigator>
      <ManageCardNavigator.Screen name="Manage Store" component={ManageStore} />
      <ManageCardNavigator.Screen name="Card Details" component={StoreOwnerCardDetails} />
      <ManageCardNavigator.Screen name="Add Stock" component={AddStockPage} />
    </ManageCardNavigator.Navigator>
    </>
    
  )
}

export default ManageStackScreen
