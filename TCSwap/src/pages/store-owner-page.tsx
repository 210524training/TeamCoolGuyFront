import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import ManageStore from './Manage-Store';
import Messenger from './Messenger';
import { Ionicons } from '@expo/vector-icons';

const StoreOwnerPage: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();
  
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store Name</Text>
      </View>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

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
          <Tab.Screen name="Manage" component={ManageStore} />
          <Tab.Screen name="Messenges" component={Messenger} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create ({
  header: {
    textAlign: 'center',
    color: 'blue',
    backgroundColor: '#731F17',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    color: '#D98E04'
  }
})

export default StoreOwnerPage;