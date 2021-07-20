import {Text, View,Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import YGOCard, { YGOCARD_HEIGHT, YGOCARD_WIDTH } from '../models/YGOCard';;
import { SearchCardResult } from '../models/SearchCardResult';
import Banner from '../components/Banner';
import { StyleSheet } from 'react-native';
import HorizontialRuleWithText from '../components/HorizontialRuleWithText';
import { getCardByName } from '../remote/apis/YGOapi';

type props = {
    route: any,
    navigation: any,
}
const SearchCardPageMain: React.FC<props> = ({ route, navigation })=>{
    const card  = route.params.card as SearchCardResult;
    const imageSrc = route.imageSrc;
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
        <ScrollView style={scrollStyle.container}>
            <Banner text={`make an offer ${card.card_owner} can not refuse`} />
            
            <View style={styles.container}>
            <Image
          style={styles.cardImage}
          source={{
            uri: data && data.card_images[0].image_url,
          }}
        />
                
                    <HorizontialRuleWithText text='NAME' />
                    <Text>{card.card_identifier}</Text>
                    <HorizontialRuleWithText text='CONDITION' />
                    <Text>{card.condition}</Text>
                    <HorizontialRuleWithText text='OWNER' />
                    <Text>{card.card_owner}</Text>
                    
                
            </View>
        </ScrollView>
        </>
    );

}


const IMAGE_SCALE = 5;
const scrollStyle = StyleSheet.create({
    container: {
      flex: 1
    },
  });

const styles = StyleSheet.create ({
    container: {
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: "#d8d9d0",
    },
    cardImage: {
      width: YGOCARD_WIDTH*IMAGE_SCALE,
      height: YGOCARD_HEIGHT*IMAGE_SCALE,
      margin: 20,
    },
  });
  
export default SearchCardPageMain;