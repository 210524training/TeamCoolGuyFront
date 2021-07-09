import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CardItem from '../components/PlayerCardItem';
import Collection from '../components/collection';


const MyCollectionPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Collection">
      <CollectionStack.Screen name="Collection" component={Collection} />
      <CollectionStack.Screen name="Card Info" component={CardItem} />
    </CollectionStack.Navigator>
  );
}

export default MyCollectionPage;
