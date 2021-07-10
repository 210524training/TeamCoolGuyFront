import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CardDetailItem from '../components/CardDetailItem';
import FakeCard from '../components/FalseCardDetails';
import Requests from '../components/Requests';


const RequestsPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Requests">
      <CollectionStack.Screen name="My Requests" component={Requests} />
      <CollectionStack.Screen name="Card Info" component={CardDetailItem} />
      <CollectionStack.Screen name="Fake Card Info" component={FakeCard} />
    </CollectionStack.Navigator>
  );
}

export default RequestsPage;
