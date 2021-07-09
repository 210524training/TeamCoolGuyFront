import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, StatusBar } from 'react-native';
import OffersPage from './offers-page';
import RequestsPage from './requests-page';
import Messenger from './Messenger';
import { Ionicons } from '@expo/vector-icons';

const TradePage: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();
  
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store Name</Text>
      </View>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Manage') {
            iconName = 'hammer';
          } else if (route.name === 'Messenges') {
            iconName = 'mail';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
          <Tab.Screen name="My Offers" component={OffersPage} />
          <Tab.Screen name="My Requests" component={RequestsPage} />
          <Tab.Screen name="Messenges" component={Messenger} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create ({
  header: {
    textAlign: 'center',
    backgroundColor: '#731F17',
    paddingTop: StatusBar.currentHeight
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
    color: '#D98E04',
    textAlign: 'center'
  }
})

export default TradePage;