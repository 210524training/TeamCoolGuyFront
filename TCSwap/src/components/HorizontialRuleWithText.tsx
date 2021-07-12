import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  text: string;
}

const HorizontialRuleWithText: React.FC<Props> = ({ text }) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 100, textAlign: 'center', fontWeight: '700'}}>{text}</Text>
        </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
    </View>
  )
}

export default HorizontialRuleWithText;