import React, { useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DBCard from '../models/DBCard';
import StoreDB from '../models/store';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import { getCardCollection, getCardFeatured } from '../remote/Backend.api';
import Banner from './Banner';
import ButtonBlackWhite from './button-black-white/ButtonBlackWhite';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component';
import StoreCardItem from './StoreCardItem';

type props = {
    navigation: any,
    route: any
}

const ViewStoreInventory: React.FC<props> = ({ navigation, route }) => {

    const { item } = route.params;
    
    
    const [ownerCards, setOwnerCards] = useState<DBCard[]>([])
    const [inventory, setInventory] = useState<DBCard[]>([])
    const [featuredCard, setFeaturedCard] = useState<string>();
    const [populatedFeaturedCard, setPopulatedFeaturedCard] = useState<YGOCard[]>([]);

    useEffect(() => {
        (async () => {
            const collection = await getCardCollection(item.storeOwner);
            console.log(collection)
            const Fcard = collection.filter((card) => {
                console.log(card.id, item.featuredCardId)
                return card.id === item.featuredCardId
            })
            setFeaturedCard(Fcard[0].card_identifier); 
            console.log(Fcard)
            setOwnerCards(collection);
        })();
    }, []);

    useEffect(() => {
        setInventory(ownerCards);
    }, [ownerCards]);    

    useEffect(() => {
        (async () => {
            if(featuredCard) {
                const YGOCard = await getCardByName(featuredCard);
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
            console.log(condensedCard)
            setPopulatedFeaturedCard([condensedCard])
            }
        })()
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
                populatedFeaturedCard.length > 0  ?
                    <View>
                        <Text style={styles.featured}>Featured Card</Text>
                        <CardDetailItemReusable data={populatedFeaturedCard[0]} />
                    </View>
                    :
                    <></>
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