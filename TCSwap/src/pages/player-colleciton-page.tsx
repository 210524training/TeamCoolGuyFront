import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CardDetailItem from '../components/CardDetailItem';
import Collection from '../components/Collection';


const MyCollectionPage: React.FC<unknown> = () => {

  const CollectionStack = createStackNavigator();

  return (
    <CollectionStack.Navigator initialRouteName="Collection">
      <CollectionStack.Screen name="Collection" component={Collection} />
      <CollectionStack.Screen name="Card Info" component={CardDetailItem} />
    </CollectionStack.Navigator>
  );
}

export default MyCollectionPage;
