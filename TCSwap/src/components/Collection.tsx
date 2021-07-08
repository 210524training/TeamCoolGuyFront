import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getCardByName } from '../remote/apis/YGOapi';

type props = {
    collection: Array<string>,
    navigation: any,
}

const Collection: React.FC<props> = (props) => {

  const tmpCollection = ['Dark Magician', 'Blue-Eyes White Dragon'];

  const buttons: JSX.Element[] = tmpCollection.map<JSX.Element>((cardName) => {
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
