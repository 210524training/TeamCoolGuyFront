import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import YGOCard, { MonsterCard } from '../../models/YGOCard';
import HorizontialRuleWithText from '../HorizontialRuleWithText';
import styles from './CardDetailItem.styles';

type props = {
    data: any;
}

const CardDetailItemReusable: React.FC<props> = ({ data }) => {

  return (
    <>
      
      <View style={styles.container}>
      <Text style={{fontWeight: '700'}}>Card Info</Text>
        <Image
          style={styles.cardImage}
          source={{
            uri: data && data.card_images[0].image_url,
          }}
        />
        <HorizontialRuleWithText text='NAME' />
        <Text>{data && data.name}</Text>
        <HorizontialRuleWithText text='CARD TYPE' />                             
        <Text>{data && data.type}</Text>
        <HorizontialRuleWithText text='TYPE' />
        <Text>{data && data.race}</Text>
        {
          (data && data.type.includes('Monster')) ? 
            <>
            <HorizontialRuleWithText text='COMBAT' />
              <Text>Attack: {(data as MonsterCard).atk} / Defense: {(data as MonsterCard).def}</Text>
              <Text>Level: {(data as MonsterCard).level} / Attribute: {(data as MonsterCard).attribute}</Text>
            </> 
            : 
            <></>
        }
        <HorizontialRuleWithText text='DESCRIPTION' />
        <Text>{data && data.desc}</Text>
      </View >
    </>
  );
}

export default CardDetailItemReusable;
