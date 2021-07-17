/**
 * This file may be refactored to all all users to add to their collections
 * 
 * NOTICE: api call can return multiple cards, but this component will only grab the first card
 *         and can be refactored to show more than one.
 */

import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import { getCardByFuzzyName, getCardByName } from '../remote/apis/YGOapi';
import YGOCard from '../models/YGOCard';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import { useEffect } from 'react';
import { addCardToCollection } from '../remote/Backend.api';
import { useAppDispatch, useAppSelector } from '../redux';
import HorizontialRuleWithText from '../components/HorizontialRuleWithText';
import User from '../models/user';
import { getCollectionAsync } from '../redux/slices/collection.slice';

type Props = { 
  navigation: any,
}

const AddStockPage: React.FC<Props> = ({ navigation }) => {

  const dispatch = useAppDispatch();

  const user: User = useAppSelector((state) => {
      return state.user as User
  })

  const [searchQuery, setSearchQuery] = useState<string>('');
	const [cardData, setCardData] = useState<YGOCard[]>();
	const [searchIndex, setSearchIndex] = useState<number>(0);

  // const [cardName, setCardName] = useState<string>('');
  // const [YGOCardList, setYGOCardList] = useState<YGOCard[]>([]);
  // const [YGOCard, setYGOCard] = useState<YGOCard[]>([]);

  const onTextChange = (query: string) => {
		setSearchQuery(query);
	}

	const onSubmit = async () => {
		setSearchIndex(0);
		const card = await getCardByFuzzyName(searchQuery);
    setCardData(card.data);
	}

	const addCard = async () => {
		if(cardData) {
			await addCardToCollection(user.username, cardData[searchIndex].name, 'Yu-Gi-Oh!', 'Mint');
			await dispatch(getCollectionAsync(user.username));
			navigation.navigate('Manage Store');
		}
	}

	const incrementSearchIndex = () => {
		if(cardData && searchIndex < cardData.length-1) {
			setSearchIndex(searchIndex+1);
		}
	}

	const decrementSearchIndex = () => {
		if(searchIndex > 0) {
			setSearchIndex(searchIndex-1);
		}
	}

  return(
    <>
      <Banner text='Search for the card you want to add' />
      <ScrollView>
        <View style={styles.controls}>
          <TextInput placeholder='Search by card name' 
                    style ={[styles.item]} 
                    onChangeText={onTextChange}/>
          <ButtonBlackWhite text='Submit' functionality = {() => {onSubmit()}}/>
        </View>
        {
          cardData ? (
            <>
              <View style={styles.controls}>
                <ButtonBlackWhite text='<-' functionality={decrementSearchIndex}/>
                <ButtonBlackWhite text='->' functionality={incrementSearchIndex}/>
              </View>
              <CardDetailItemReusable data={cardData[searchIndex]} />
              <View style={styles.container}>
                <HorizontialRuleWithText text='Is this your card'/>
                <ButtonBlackWhite text='Yes' functionality = {addCard}/>
              </View>
            </>
          )
          :
          (<></>)
        }
      </ScrollView>
    </>
)
}

export default AddStockPage;

const styles = StyleSheet.create ({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#d8d9d0",
  },
  title: {
    fontSize: 26,
  },
  tinyLogo: {
    width: 50,
    height: 75,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
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
})
