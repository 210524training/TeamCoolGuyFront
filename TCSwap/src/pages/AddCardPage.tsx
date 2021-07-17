import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ScrollView, Picker } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import HorizontialRuleWithText from '../components/HorizontialRuleWithText';
import YGOCard from '../models/YGOCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { getCollectionAsync } from '../redux/slices/collection.slice';
import { selectUser, UserState } from '../redux/slices/user.slice';
import { getCardByFuzzyName } from '../remote/apis/YGOapi';
import { addCardToCollection } from '../remote/Backend.api';

type props = {
	navigation: any,
}

const AddCardPage: React.FC<props> = (props) => {

	const dispatch = useAppDispatch();
	const user = useAppSelector<UserState>(selectUser);

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [cardData, setCardData] = useState<YGOCard[]>();
	const [searchIndex, setSearchIndex] = useState<number>(0);
	const [game, setGame] = useState<string>('Yu-Gi-Oh!');
	const [condition, setCondition] = useState<string>('');

	const onTextChange = (query: string) => {
		setSearchQuery(query);
	}

	const onSubmit = async () => {
		try {
			setSearchIndex(0);
			const card = await getCardByFuzzyName(searchQuery);
			setCardData(card.data);
		}
		catch(error) {
			console.log('Unable to find card', error);
		}
	}

	const addCard = async () => {
		if(cardData) {
			if(user) {
				await addCardToCollection(user.username, cardData[searchIndex].name, game, condition);
				await dispatch(getCollectionAsync(user.username));
				props.navigation.navigate('Collection');
			}
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
									<View style={styles.controls}>
										<Picker
											selectedValue={game}
											style={styles.item}
											onValueChange={(itemValue, itemIndex) => setGame(itemValue)}>
											<Picker.Item label='Yu-Gi-Oh!' value='Yu-Gi-Oh!'/>
										</Picker>
										<Text style={styles.description}>Card condition: </Text>
										<TextInput style={styles.item} onChangeText={setCondition} placeholder='Mint' />
										<ButtonBlackWhite text='Add card' functionality = {addCard}/>
									</View>
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
	description: {
		paddingVertical: 10,
		fontSize: 24,
	}
})

export default AddCardPage;