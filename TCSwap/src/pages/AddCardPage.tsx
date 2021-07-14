import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ScrollView } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import HorizontialRuleWithText from '../components/HorizontialRuleWithText';
import YGOCard from '../models/YGOCard';
import { getCardByFuzzyName, getCardByName } from '../remote/apis/YGOapi';
import { addCardToCollection } from '../remote/Backend.api';

type props = {
	navigation: any,
}

const AddCardPage: React.FC<props> = (props) => {

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [cardData, setCardData] = useState<YGOCard[]>();
	const [searchIndex, setSearchIndex] = useState<number>(0);

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
			await addCardToCollection(cardData[searchIndex].name);
			props.navigation.navigate('Collection');
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

export default AddCardPage;