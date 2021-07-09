import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getCardCollection } from '../remote/Backend.api';

type props = {
    collection: Array<string>,
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const [cardCollection, setCardCollection] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const collection = await getCardCollection();
      setCardCollection(collection);
    })();
  }, []);

  const buttons: JSX.Element[] = cardCollection.map<JSX.Element>((cardName) => {
    return (
    <Button title={cardName}
            onPress={() => { props.navigation.navigate('Card Info', {cardName}); } }>
      {cardName}
    </Button>)
  })

  return (
    <>
      {buttons}
    </>
  );
}

export default Collection;
