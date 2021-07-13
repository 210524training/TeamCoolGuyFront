import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TradeItem from '../components/TradeItem';
import Offers from '../components/Offers';


const OffersPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Offers">
      <CollectionStack.Screen name="My Offers" component={Offers} />
      <CollectionStack.Screen name="Details" component={TradeItem} />
    </CollectionStack.Navigator>
  );
}

export default OffersPage;
