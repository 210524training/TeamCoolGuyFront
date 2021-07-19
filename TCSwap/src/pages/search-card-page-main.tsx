import { createStackNavigator } from '@react-navigation/stack';
import SearchCardPage from "./search-card-page";
import React from 'react';


const SearchCardPageMain: React.FC<unknown> = ()=>{
    const CollectionStack = createStackNavigator();
    return (
        <CollectionStack.Navigator initialRouteName="Find Card">
            <CollectionStack.Screen name="Find Card" component={SearchCardPage} />
        </CollectionStack.Navigator>
    );
}

export default SearchCardPageMain;