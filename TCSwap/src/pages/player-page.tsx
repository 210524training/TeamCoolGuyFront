import * as React from 'react';
/* import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync, logout, selectUser, UserState } from '../hooks/slices/user.slice'; */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import pages
import TradePage from './trade-page';
import MyCollectionPage from './player-colleciton-page';
import ViewStoreNav from '../components/ViewStoreNav';
import SearchCardPageMain from '../pages/search-card-page-main';

const PlayerPage: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="My Collection" component={MyCollectionPage} />
        <Tab.Screen name="Find Card" component={SearchCardPageMain} /> 
        <Tab.Screen name="Trades" component={TradePage} />
        <Tab.Screen name="View Stores" component={ViewStoreNav} /> 
      </Tab.Navigator>
    </>
  );
}

export default PlayerPage;