import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Messenger: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();

  return (
    <>
      <View>
          <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Text>
      </View>
    </>
    
  );
}

export default Messenger;