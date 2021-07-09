import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  item: any,
}

const StoreOwnerCardDetails: React.FC<Props>= ({ item }) => {
  console.log(item);
  return (
    <View>
      <Text>Card details</Text>
    </View>
  )
}

export default StoreOwnerCardDetails;