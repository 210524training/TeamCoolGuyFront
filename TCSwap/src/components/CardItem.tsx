import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getCardByName } from '../remote/apis/YGOapi';

type props = {
    route: any;
}

const CardItem: React.FC<props> = ({route}) => {

  const { cardName } = route.params;

  const [cardDetails, setCardDetails] = useState<unknown>();

//   useEffect(() => {
//     (async () => {
//       const card = await getCardByName(props.cardName);
//       setCardDetails(card);
//       console.log(card);
//     })();
//   }, []);
  console.log(cardName);

  return (
    <View>
      <Text>{cardName}</Text>
    </View >
  );
}

export default CardItem;
