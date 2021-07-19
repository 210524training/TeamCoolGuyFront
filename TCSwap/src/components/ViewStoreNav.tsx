import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddCardPage from '../pages/AddCardPage';
import ManageStore from '../pages/Manage-Store';
import AddStockPage from '../pages/store-owner-add-stock-page';
import StoreOwnerCardDetails from '../pages/store-owner-card-details-page';
import ViewStoresPage from '../pages/stores-page';
import ViewStoreCardDetails from './ViewStoreCardDetails';
import ViewStoreInventory from './ViewStoreInventory';

const storeStack = createStackNavigator();

const ViewStoreNav = () => {
  return (
    <>
      <storeStack.Navigator>
        <storeStack.Screen name="Stores" component={ViewStoresPage} />
        <storeStack.Screen name="Inventory" component={ViewStoreInventory} />
        <storeStack.Screen name="Details" component={ViewStoreCardDetails} />
      </storeStack.Navigator>
    </>

  )
}

export default ViewStoreNav;
