import * as React from 'react';
import { Text, View } from 'react-native';

const TradeItem: React.FC<unknown> = () => {

  return (
    <View>
      {/* <Image/> */}
      <Text>Request from: {/* Insert other user */}</Text>
      <Text>Defense</Text>
      <Text>Level</Text>
      <Text>Attribute</Text>
    </View >
  );
}

export default TradeItem;