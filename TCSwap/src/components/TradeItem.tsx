import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import YGOCard from '../models/YGOCard';
import DBCard from '../models/DBCard';
import { YGOCARD_WIDTH, YGOCARD_HEIGHT } from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component';
import Offer from '../models/Offer';
import { useAppSelector, useAppDispatch } from '../redux';
import { UserState, selectUser } from '../redux/slices/user.slice';
import { acceptOffer, rejectOffer } from '../remote/Backend.api';

type Props = { 
  navigation: any,
  route: any
}

const TradeItem: React.FC<Props> = ( { navigation, route }) => {
  const offer = route.params.trade as Offer;
  const [requestorCard, setRequestorCard] = React.useState<YGOCard>();
  const [deciderCard, setDeciderCard] = React.useState<YGOCard>();
  const user = useAppSelector<UserState>(selectUser);
    const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // const card1 = /* await getCardByName(offer.requestorCards[0].card_identifier) */;
      const decider = await getCardByName(offer.deciderCards[0].card_identifier);
      // setRequestorCard(card1.data[0]);
      setDeciderCard(decider.data[0]);
    })();
  }, [])

  async function handleAccept() {
    const result = await acceptOffer(offer);
    if(result){
      alert('Trade accepted!');
      navigation.navigate('My Offers'); 
    }
    else{
      alert('Request failed.');
    }
    
  }

  async function handleReject() {
    const result = await rejectOffer(offer);
    if(result){
      alert('Trade rejected.');
      navigation.navigate('My Offers'); 
    }
    else{
      alert('Request failed.');
    }
    
  }

  const requestors: JSX.Element[] = offer.requestorCards.map<JSX.Element>((card: DBCard) => {
    
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.cardImage} source={require('../assets/yugioh-card-back.png')} />
        </View>
        <View style={styles.details} key = {card.card_identifier}>
          <Text style={[styles.title]} key = {card.card_identifier}>
            {'Name: ' + card.card_identifier}
          </Text>
          <Text style={[styles.title]} key = {card.card_identifier}>
           {'Condition: ' + card.condition}
          </Text>
        </View>
    </View>
    )
  })

  return (
    <ScrollView>
      <View>
        {requestors}
        {(deciderCard)?
          (
            <CardDetailItemReusable data={deciderCard} />
          ) : (<></>)
        }
      </View>
      {(user?.username === offer.decider)? 
        (
          <View style={styles.controls}>
            <ButtonBlackWhite text="Accept" functionality= { () => { handleAccept() } }/>
            <ButtonBlackWhite text="Reject" functionality= { () => { handleReject() } }/>  
          </View>
        ) : (<></>)
      }
    
    </ScrollView>
  );
}

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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
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
  cardImage: {
    width: YGOCARD_WIDTH*1,
    height: YGOCARD_HEIGHT*1,
    margin: 20,
  },
})


export default TradeItem;