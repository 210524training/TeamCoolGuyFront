import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Collection from '../components/Collection';
import ScrollableCardDisplay from '../components/ScrollableCardDisplay';
import AddCardPage from './AddCardPage';


const MyCollectionPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Collection">
      <CollectionStack.Screen name="Collection" component={Collection} />
      <CollectionStack.Screen name="Card Info" component={ScrollableCardDisplay} />
      <CollectionStack.Screen name="Add Card Page" component={AddCardPage} />
    </CollectionStack.Navigator>
  );
}

export default MyCollectionPage;
