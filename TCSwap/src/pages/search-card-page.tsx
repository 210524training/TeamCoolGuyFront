import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, ScrollView, Picker, Image } from 'react-native';
import Banner from '../components/Banner';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite';
import SearchCardDetailItem from '../components/card-detail-item-reuse/SearchCardDetailItem.component';
import { SearchCardResult } from '../models/SearchCardResult';
import { searchCardAcrossUsers } from '../remote/Backend.api';
import DropDownPicker from 'react-native-dropdown-picker'

type props = {
	navigation: any,
}

const SearchCardPage: React.FC<props> = (props) => {

	const [searchQuery, setSearchQuery] = useState<string>('');
	const [cardData, setCardData] = useState<SearchCardResult[]>();
	const [searchIndex, setSearchIndex] = useState<number>(0);
	const [game, setGame] = useState<string>('Yu-Gi-Oh!');

	//This value is used to see if the dropdown for selecting game type is open ie you can see the dropdown
	const [gamePickerOpen, setGamePickerOpen] = useState<boolean>(false);

	const onTextChange = (query: string) => {
		setSearchQuery(query);
	}

	const onSubmit = async () => {
		try {
			setSearchIndex(0);
			const card = await searchCardAcrossUsers(searchQuery);
			setCardData(card);
		}
		catch(error) {
			console.log('Unable to find card', error);
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
				<Banner text='Search for the card you want across other players and stores' />
				<ScrollView>
					<View style={styles.controls}>
											{/* <Picker
												selectedValue={game}
												style={styles.item}
												onValueChange={(itemValue, itemIndex) => setGame(itemValue)}>
												<Picker.Item label='Yu-Gi-Oh!' value='Yu-Gi-Oh!'/>
											</Picker> */}
											<DropDownPicker items={[
												{
													label: '',
													value: 'Yu-Gi-Oh!',
													icon: () => (<Image source={require('../assets/Yu-Gi-Oh.png')} style={styles.tinyLogo}></Image>)
												},
												// {
												// 	label: '',
												// 	value: 'Magic the Gathering',
												// 	icon: () => (<Image source={require('../assets/magic-logo.png')} style={styles.tinyLogo}></Image>)
												// }
											]
											}
											value={game}
											open={gamePickerOpen}
											setOpen={setGamePickerOpen}
											setValue={setGame}
											iconContainerStyle={{alignItems: 'center', padding:10}}
											containerStyle={styles.picker}/>
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
                                    <Text>{cardData.length>0?(<>
                                        {`Result ${searchIndex+1} out of ${cardData.length}`}
                                    </>):(<></>)}</Text>
									<ButtonBlackWhite text='->' functionality={incrementSearchIndex}/>
								</View>
								<SearchCardDetailItem card={cardData[searchIndex]} />
								
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
    width: 150,
    height: 50,
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

export default SearchCardPage;