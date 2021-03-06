import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ScrollView, Picker, Image } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from '../components/card-detail-item-reuse/CardDetailItem.component';
import YGOCard from '../models/YGOCard';
import MagicCard from '../models/MagicCard';
import { useAppDispatch, useAppSelector } from '../redux';
import { getCollectionAsync } from '../redux/slices/collection.slice';
import { selectUser, UserState } from '../redux/slices/user.slice';
import { getCardByFuzzyName as getYGOCardFuzzy } from '../remote/apis/YGOapi';
import { getCardByFuzzyName as getMTGCardFuzzy } from '../remote/apis/MTGapi';
import { addCardToCollection } from '../remote/Backend.api';
import DropDownPicker from 'react-native-dropdown-picker'
import MagicCardDetailItem from '../components/card-detail-item-reuse/MagicCardDetailItem';

type anyCard = YGOCard | MagicCard;

type props = {
	navigation: any,
}

const AddCardPage: React.FC<props> = (props) => {

	const dispatch = useAppDispatch();
	const user = useAppSelector<UserState>(selectUser);

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [cardData, setCardData] = useState<anyCard[]>();
	const [searchIndex, setSearchIndex] = useState<number>(0);
	const [game, setGame] = useState<string>('Yu-Gi-Oh!');
	const [condition, setCondition] = useState<string>('');

	//This value is used to see if the dropdown for selecting game type is open ie you can see the dropdown
	const [gamePickerOpen, setGamePickerOpen] = useState<boolean>(false);

	const onTextChange = (query: string) => {
		setSearchQuery(query);
	}

	const onSubmit = async () => {
		try {
			if(game === 'Yu-Gi-Oh!') {
				setSearchIndex(0);
				const card = await getYGOCardFuzzy(searchQuery);
				setCardData(card.data);
			}
			else if(game === 'Magic the Gathering') {
				setSearchIndex(0);
				const card = await getMTGCardFuzzy(searchQuery);
				setCardData(card);
			}
		}
		catch(error) {
			console.log('Unable to find card', error);
		}
	}

	const addCard = async () => {
		if(game !== 'Magic the Gathering') {
			if(cardData) {
				if(user) {
					await addCardToCollection(user.username, cardData[searchIndex].name, game, condition);
					await dispatch(getCollectionAsync(user.username));
					props.navigation.navigate('Collection');
				}
			}
		}
	}

	const onChange = (game: string) => {
		setGame(game);
		setCardData(undefined);
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
					<View style={styles.dropMenuWrapper}>
							<DropDownPicker items={[
								{
									label: '',
									value: 'Yu-Gi-Oh!',
									icon: () => (<Image 
										source={require('../assets/Yu-Gi-Oh.png')} 
										style={styles.tinyLogo}
										/>)
								},
								{
									label: '',
									value: 'Magic the Gathering',
									icon: () => (<Image source={require('../assets/magic-logo.png')} style={styles.tinyLogo}></Image>)
								}
							]
							}
							value={game}
							open={gamePickerOpen}
							setOpen={setGamePickerOpen}
							setValue={onChange}
							iconContainerStyle={{alignItems: 'center', padding:10, }}
							containerStyle={styles.picker}
						/>
					</View>
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
								{
									(game === 'Yu-Gi-Oh!') ?
									(<CardDetailItemReusable data={cardData[searchIndex] as YGOCard} />)
									:
									(<MagicCardDetailItem data={cardData[searchIndex] as MagicCard} />)
								}
								<View style={styles.container}>
										<View style={styles.controls}>
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
    width: 195,
    height: 70,
		
  },
	dropMenuWrapper: {
		marginTop: 10,
		marginBottom: 50,
		flex: 1,
		alignItems: 'center',
	},
  details: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  controls: {
	flex: 1,
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
		paddingVertical: 20,
		paddingHorizontal: 14,
		fontSize: 26,
	},
	picker: {
		width: 240,
		height: 80,
		padding: 10,
		flexDirection: 'row',
	}
})

export default AddCardPage;