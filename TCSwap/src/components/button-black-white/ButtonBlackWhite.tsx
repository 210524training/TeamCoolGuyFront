import React from 'react';
import { Pressable, Text, TouchableOpacity } from 'react-native';
import { styles } from './ButtonBlackWhite.styles'

type Props = {
  functionality: any;
  text: string;
}

const ButtonBlackWhite: React.FC<Props> =({ functionality, text }) => {
  return (
    <TouchableOpacity  style={styles.button} onPress={functionality}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )  
}

export default ButtonBlackWhite