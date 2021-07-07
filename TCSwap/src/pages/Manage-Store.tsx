import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert } from 'react-native';


const ManageStore: React.FC<unknown> = () => {

  const handleAddCard = () => {
    Alert.alert("Add New Stock", "Enter name of the card to add to inventory",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  return (
    <>
      <View>
        <Button title="Add Stock" onPress={handleAddCard} />
      </View>
    </>
    
  );
}

export default ManageStore;

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