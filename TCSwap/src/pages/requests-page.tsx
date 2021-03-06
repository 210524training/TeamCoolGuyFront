import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FakeCard from '../components/TradeItem';
import Requests from '../components/Requests';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';


const RequestsPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Requests">
      <CollectionStack.Screen name="My Requests" component={Requests} />
      <CollectionStack.Screen name="Card Info" component={CardDetailItemReusable} />
      <CollectionStack.Screen name="Details" component={FakeCard} />
    </CollectionStack.Navigator>
  );
}

export default RequestsPage;
