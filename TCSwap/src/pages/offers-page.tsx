import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CardDetailItem from '../components/CardDetailItem';
import FakeCard from '../components/FalseCardDetails';
import Offers from '../components/Offers';


const OffersPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Offers">
      <CollectionStack.Screen name="My Offers" component={Offers} />
      <CollectionStack.Screen name="Card Info" component={CardDetailItem} />
      <CollectionStack.Screen name="Fake Card Info" component={FakeCard} />
    </CollectionStack.Navigator>
  );
}

export default OffersPage;
