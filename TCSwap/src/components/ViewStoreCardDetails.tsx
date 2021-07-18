import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import YGOCard from '../models/YGOCard';
import { getCardByName } from '../remote/apis/YGOapi';
import CardDetailItemReusable from './card-detail-item-reuse/CardDetailItem.component'

type props = {
    data: any
    route: any
}


const ViewStoreCardDetails: React.FC<props> = ({ data, route }) => {

    const { item } = route.params;
    console.log(item)

    const [cardDetails, setCardDetails] = useState<YGOCard[]>([]);
    const [cardData, setCardData] = useState<YGOCard[]>([]);
  
  useEffect(() => {
    
    (async() => {
        const YGOCard = await getCardByName(item.card_identifier);
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
        setCardData([condensedCard])
      }
    )()
  }, [])

  useEffect(() => {
    setCardDetails(cardData)
  }, [cardData])

    return ( 
        <ScrollView>
            <CardDetailItemReusable data={cardDetails[0]}/>
        </ScrollView>
    )

}

export default ViewStoreCardDetails;