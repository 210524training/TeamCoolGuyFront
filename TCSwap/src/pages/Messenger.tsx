import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Messenger: React.FC<unknown> = () => {

  const Tab = createBottomTabNavigator();

  return (
    <>
      <View>
          <Text>Messenges</Text>
      </View>
    </>
    
  );
}

export default Messenger;