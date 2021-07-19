import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import {SearchCardResult} from '../../models/SearchCardResult';
import HorizontialRuleWithText from '../HorizontialRuleWithText';
import styles from './CardDetailItem.styles';
import YGOCard, { MonsterCard } from '../../models/YGOCard';
import { getCardByName } from '../../remote/apis/YGOapi';

type props = {
    card: SearchCardResult;
}

const CardSearchResult: React.FC<props> = ({ card }) => {
  const [data, setData] = useState<YGOCard>();
  useEffect(() => {
    (async () => {
      setData(undefined);
      const result = await getCardByName(card.card_identifier);
      if(result.data.length > 0) {
        setData(result.data[0]);
      }
      
    })();
  }, [card]);
    return (
      <>
        {(!data)?(<Text>Loading Card...</Text>):(
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
            <HorizontialRuleWithText text='OWNER' />
            <Text>{card.card_owner}</Text>
            <HorizontialRuleWithText text='OWNER ROLE' />
            <Text>{card.role}</Text>
            <HorizontialRuleWithText text='CONDITION' />
            <Text>{card.condition}</Text>
            <HorizontialRuleWithText text='NUMBER OWNED' />
            <Text>{card.num_owned}</Text>
            <HorizontialRuleWithText text='GAME' />
            <Text>{card.game}</Text>
          </View >
        )}
      </>
    );
  }
  
  export default CardSearchResult;