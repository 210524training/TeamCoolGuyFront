import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable, StatusBar } from 'react-native';
import DATA from '../../temp-card-data.json'
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import StoreCardItem from '../components/Store-Card-Item'
import StoreOwnerCardDetails from './store-owner-card-details-page';

type Props = {
  item: any
  navigation: any
}

const ManageStore: React.FC<Props> = ({ navigation }) => {

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

  const handleOnPress = () => {
    navigation.navigate('Card-Details');
  }

  const renderCardItem = ({ item }) => {

    return (
      <StoreCardItem
        item={item}
        onPress={handleOnPress}
        navigation={ navigation }
      />
    );
  };
  
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Store Name</Text>
      </View>
      <View style={styles.controls}>
        <ButtonBlackWhite text={'Add Stock'} functionality={() => handleAddCard()} />
        <ButtonBlackWhite text={'Set Featured'} functionality={() => handleSetFeaturedCard()} />
      </View>
      <View>
          <FlatList 
            data={DATA}
            renderItem={renderCardItem}
            keyExtractor={(item) => String(item.id)}
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
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#731F17',
    paddingTop: 20
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
    color: '#D98E04',
    textAlign: 'center'
  }
});
