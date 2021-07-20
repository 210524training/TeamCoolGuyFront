import React from 'react';
import { Text, View, Image } from 'react-native';
import MagicCard from '../../models/MagicCard';
import HorizontialRuleWithText from '../HorizontialRuleWithText';
import styles from './CardDetailItem.styles';

type props = {
    data: MagicCard;
}

const MagicCardDetailItem: React.FC<props> = ({ data }) => {

  return (
    <>
      
      <View style={styles.container}>
      <Text style={{fontWeight: '700'}}>Card Info</Text>
        <Image
          style={styles.cardImage}
          source={{
            uri: data && data.imageUrl,
          }}
        />
        <HorizontialRuleWithText text='NAME' />
        <Text>{data && data.name}</Text>
        <HorizontialRuleWithText text='CARD TYPE' />                             
        <Text>{data && data.types}</Text>
        <HorizontialRuleWithText text='COLORS' />
        <Text>{data && data.colors}</Text>
        <HorizontialRuleWithText text='MANA COST' />
        <Text>{data && data.manaCost}</Text>
        <HorizontialRuleWithText text='TEXT' />
        <Text>{data && data.text}</Text>
        <HorizontialRuleWithText text='FLAVOR TEXT' />
        <Text>{data && data.flavor}</Text>
      </View >
    </>
  );
}

export default MagicCardDetailItem;
