import {Text, View,Image, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import YGOCard, { YGOCARD_HEIGHT, YGOCARD_WIDTH } from '../models/YGOCard';;
import { SearchCardResult } from '../models/SearchCardResult';
import Banner from '../components/Banner';
import { StyleSheet } from 'react-native';
import HorizontialRuleWithText from '../components/HorizontialRuleWithText';
import { getCardByName } from '../remote/apis/YGOapi';
import { useAppDispatch, useAppSelector } from '../redux';
import { selectCollection } from '../redux/slices/collection.slice';
import DBCard from '../models/DBCard';
import ButtonBlackWhite from '../components/button-black-white/ButtonBlackWhite'
import Offer from '../models/Offer';
import { selectUser, UserState } from '../redux/slices/user.slice';
import { createOffer } from '../remote/Backend.api';

type props = {
    route: any,
    navigation: any,
}
const SearchCardPageMain: React.FC<props> = ({ route, navigation })=>{
    const card  = route.params.card as SearchCardResult;
    const imageSrc = route.imageSrc;
    const [data, setData] = useState<YGOCard>();
    const [addArr, setAddArr] = useState<number[]>([]);
    const [adders, setAdders] = useState<JSX.Element[]>([]);
	  const user = useAppSelector<UserState>(selectUser);
    const dispatch = useAppDispatch();
    const collection = useAppSelector<DBCard[]>(selectCollection) || [];
  useLayoutEffect(()=>{
    const newAddArr:number[]=[];
    collection.forEach(()=>{
      newAddArr.push( 0);
    });
    setAddArr(newAddArr);
  },[collection]);
  useEffect(() => {
    (async () => {
      setData(undefined);
      const result = await getCardByName(card.card_identifier);
      if(result.data.length > 0) {
        setData(result.data[0]);
      }
      
    })();
  }, [card]);
  useEffect(() => {
    if(addArr.length<=0) return;
    const newAdder:JSX.Element[] =[];
    for(let i = 0; i < collection.length; i++){
      newAdder.push(<>
        <View style={styles.item} >
          <Text style={[styles.title]}>{`card: ${collection[i].card_identifier}`}</Text>
          <Text style={[styles.title]}>{`condition: ${collection[i].condition}`}</Text>
          <Text style={[styles.title]}>{`number owned: ${collection[i].num_owned}`}</Text>
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', }}>
            <ButtonBlackWhite small text='+' functionality = {()=>{incAdder(i)}}/>
            <AddItemCount addArrIn={addArr} index={i} />
            <ButtonBlackWhite small  text='-' functionality = {()=>{decAdder(i)}}/>
          </View>
        </View>
        
      </>
      );
    } 
      
      setAdders(newAdder);
      
  }, [addArr]);
  function decAdder(i: number): any {
    if(addArr[i] <= 0)return;
    const tempAddArr:number[] = [];
    addArr.forEach(num=>tempAddArr.push(num));
    tempAddArr[i] = tempAddArr[i]-1; 
    setAddArr(tempAddArr);
  }
  function incAdder(i: number): any {
    if(addArr[i] >= collection[i].num_owned)return;
    const tempAddArr:number[] = [];
    addArr.forEach(num=>tempAddArr.push(num));
    tempAddArr[i] = tempAddArr[i]+1;
    setAddArr(tempAddArr);
  }

  async function onRequestButtonClick(){
    const newOffer:Offer = {
      id: -1,
      requestor: user?user.username:'',
      decider: card.card_owner,
      status:'pending',
      requestorCards: [],
      deciderCards: [],
    }
    newOffer.deciderCards.push({
      card_identifier: card.card_identifier,
      card_owner: card.card_owner,
      condition: card.condition,
      game: card.game,
      id: card.id,
      num_owned: card.num_owned,
    });
    for(let i = 0; i<collection.length;i++){
      if(addArr[i]>0){
        for(let j = 0; j<addArr[i]; j++){
          newOffer.requestorCards.push(collection[i]);
        }
      }
    }
    console.log(newOffer);
    const result = await createOffer(newOffer);
    if(result){
      alert('Request sent.');
      navigation.navigate('Find Card'); 
    }
    else{
      alert('Request failed.');
    }
    
  }
    return (
        <>
        <ScrollView style={scrollStyle.container}>
            <Banner text={`Make an offer ${card.card_owner} can not refuse`} />
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
            <View>
              <Text style={{fontWeight: 'bold',fontSize: 20,padding: 20,textAlign: 'center'}} >Pick from Your Collection</Text>
              {adders}
              <ButtonBlackWhite text='Send Trade Request' functionality = {() => {onRequestButtonClick()}}/>
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
    title: {
      fontSize: 26,
      flexDirection:'row'
    },
    tinyLogo: {
      width: 50,
      height: 75,
    },
    details: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection:'column',
    },
    item: {
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: "#d8d9d0",
    },
  });
  
export default SearchCardPageMain;

type Props = {
addArrIn: number[],
index: number,
}
const AddItemCount: React.FC<Props> = ({addArrIn, index}) => {
  return(
            <Text
              style={{ fontSize: 18, margin: 10, backgroundColor: 'white',width:40,alignItems: 'center', textAlign: 'center'}}
            >{addArrIn[index]}</Text>
            
  );
}


