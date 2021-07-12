import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Collection from '../components/Collection';
import ScrollableCardDisplay from '../components/ScrollableCardDisplay';


const MyCollectionPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Collection">
      <CollectionStack.Screen name="Collection" component={Collection} />
      <CollectionStack.Screen name="Card Info" component={ScrollableCardDisplay} />
    </CollectionStack.Navigator>
  );
}

export default MyCollectionPage;
