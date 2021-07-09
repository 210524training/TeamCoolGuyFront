import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import DATA from '../../temp-card-data.json'
import Item from '../components/PlayerCardItem'



const OffersPage: React.FC<unknown> = () => {

  const [selectedId, setSelectedId] = React.useState(null);

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

export default OffersPage;

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