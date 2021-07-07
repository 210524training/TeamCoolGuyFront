import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import DATA from '../../temp-card-data.json'
import Item from '../components/Store-Card-Item'



const ManageStore: React.FC<unknown> = () => {

  const [selectedId, setSelectedId] = React.useState(null);

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

  const handleSetFeaturedCard = () => {
    Alert.alert("Set Featured Card", "Enter name of the card to add to featured",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#022873" : "#d8d9d0";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
      <View style={styles.controls}>
        <Pressable  style={styles.button} onPress={() => handleAddCard()}>
          <Text style={styles.text}>Add Stock</Text>
        </Pressable>
        <Pressable  style={styles.button} onPress={() => handleSetFeaturedCard()}>
          <Text style={styles.text}>Set Featured</Text>
        </Pressable>
      </View>
      <View>
          <FlatList 
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            extraData={selectedId}
          >
          </FlatList>
      </View>
    </>
    
  );
}

export default ManageStore;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
