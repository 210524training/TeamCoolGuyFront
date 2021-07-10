import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  text: string,
}

const Banner: React.FC<Props> = ({ text }) => {
  return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
      </View>
  )
}

export default Banner;

const styles = StyleSheet.create({
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