import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';

type Props = {
  item: any,
  onPress: any,
  backgroundColor: any,
  textColor: any,
}

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

const CardItem: React.FC<Props> = ({ item, onPress, backgroundColor, textColor }) => (

  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://storage.googleapis.com/ygoprodeck.com/pics_small/6983839.jpg',
        }}
      />
      <View style={styles.details}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
      </View>
  </TouchableOpacity>
  
);

export default CardItem

const styles = StyleSheet.create ({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
  },
  tinyLogo: {
    width: 50,
    height: 75,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  }
})
