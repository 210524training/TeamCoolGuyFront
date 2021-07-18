import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DBCard from '../models/DBCard';
import StoreDB from '../models/store';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import { getCardCollection } from '../remote/Backend.api';
import Banner from './Banner';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component';
import StoreCardItem from './StoreCardItem';

type props = {
    navigation: any,
    route: any
}

const ViewStoreInventory: React.FC<props> = ({ navigation, route }) => {
    const [featuredCard, setFeaturedCard] = useState<string[]>([]);
    const [populatedFeaturedCard, setPopulatedFeaturedCard] = useState<YGOCard[]>([]);
    const { item } = route.params;
    const [ownerCards, setOwnerCards] = useState<DBCard[]>([])
    useEffect(() => {
        (async () => {
            const collection = await getCardCollection(item.storeOwner);
            setOwnerCards(collection);
        })();
    }, []);

    const [inventory, setInventory] = useState<DBCard[]>([])
    useEffect(() => {
        (async () => {
            setInventory(ownerCards);
        })();
        console.log(inventory);
    }, [ownerCards]);

    useEffect(() => {
        (async () => {
          const currentStore: StoreDB[] | any = await getUsersStore(user.username)
          setStoreDB(currentStore[0])
          const cards = await getCardFeatured(user.username);
          if (cards.length > 0) {
            setFeaturedCard([cards[0].card_identifier]); 
          }
          
        })()
      },[])
    console.log(item);
    

    useEffect(() => {
        (async () => {
            const YGOCard = await getCardByName(featuredCard[0]);
            const condensedCard = {
                id: YGOCard.data[0].id,
                name: YGOCard.data[0].name,
                type: YGOCard.data[0].type,
                desc: YGOCard.data[0].desc,
                atk: YGOCard.data[0].atk,
                def: YGOCard.data[0].def,
                level: YGOCard.data[0].level,
                race: YGOCard.data[0].race,
                attribute: YGOCard.data[0].attribute,
                card_images: YGOCard.data[0].card_images,
                card_prices: YGOCard.data[0].card_prices,
            }
            setPopulatedFeaturedCard([condensedCard])
        }
        )()
    }, [featuredCard])

    const renderItem = ({ item }) => {
        return (
            <StoreCardItem
                cardName={item.card_identifier}
                onPress={() => navigation.navigate('Details', { navigation, item })}
            />
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <Banner text={item.storeName || ''} />
            {
                item.featuredCardId !== null ?
                    <View>
                        <Text style={styles.featured}>Featured Card</Text>
                        <CardDetailItemReusable data={populatedFeaturedCard[0]} />
                    </View>
                    :
                    <Text style={styles.featured}>Set a featured card to display here!</Text>
            }
            <View style={{ flex: 1 }}>
                <Text style={styles.featured}>Inventory</Text>
                <FlatList
                    data={inventory}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    featured: {
        fontSize: 24,
        fontWeight: '500',
        alignSelf: 'center',
        marginTop: 30,
        borderBottomWidth: 4,
    }
});

export default ViewStoreInventory;