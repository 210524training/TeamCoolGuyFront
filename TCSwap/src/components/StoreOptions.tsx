import React from 'react';
import { View, Text } from 'react-native';
import HorizontialRuleWithText from './HorizontialRuleWithText';
import styles from './card-detail-item-reuse/CardDetailItem.styles';
import YGOCard from '../models/YGOCard';

type props = {
  data: YGOCard;
}

//A component for the the card item details specific to store
const StoreOptions: React.FC<props> = ({ data }) => {

    return (
        <View style={styles.container}>
        <Text style={{fontWeight: '700'}}>Store Options</Text>
        <HorizontialRuleWithText text='PRICE' />
        {
          data?.card_prices ? 
          <Text>{data && data?.card_prices[0].ebay_price }</Text> :
          <Text>None Listed</Text>
        }
        <HorizontialRuleWithText text='Featured' />
        <Text>Not Implemented Yet...</Text>
      </View>
    )
}

export default StoreOptions;