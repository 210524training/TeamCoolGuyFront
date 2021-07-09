import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './ButtonBlackWhite.styles'

type Props = {
  functionality: any;
  text: string;
}

const ButtonBlackWhite: React.FC<Props> =({ functionality, text }) => {
  console.log('text',text)
  return (
    <Pressable  style={styles.button} onPress={functionality}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )  
}

export default ButtonBlackWhite