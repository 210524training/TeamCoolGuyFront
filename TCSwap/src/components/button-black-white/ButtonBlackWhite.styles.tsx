import React from 'react';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
  buttonSmall: {
    margin: 5,
    width: 75,
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
  }
});
