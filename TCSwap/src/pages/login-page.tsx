import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../redux';
import { loginAsync, logout, selectUser, UserState } from '../redux/slices/user.slice'; 
import { useNavigation } from '@react-navigation/native';

type Props = { navigation: any }

const LoginPage: React.FC<Props> = ({ navigation }) => {

  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleOwnerLogin = async () => {
    const result = await dispatch(loginAsync({username:'best_owner', password:'root' }));
    if(result.meta.requestStatus ==='fulfilled'){
      navigation.navigate('Store Owners');
    }else{
      alert('login failed');
    }
    
  }

  const handlePlayerLogin = async () => {
    const result = await dispatch(loginAsync({username:'best_player', password:'root' }));
    if(result.meta.requestStatus ==='fulfilled'){
      navigation.navigate('Players');
    }else{
      alert('login failed');
    }
  }

  const handleLogin= async()=>{
    const result = await dispatch(loginAsync({username, password}));
    if(result.meta.requestStatus ==='fulfilled'){
      navigation.navigate('Players');
    }else{
      alert('login failed');
    }
  }

  return (
    <>
      <View>
        <Text>Hello! Welcome to our login page.</Text>
        <Button
          title="Store owner log in shortcut"
          onPress={handleOwnerLogin}>Store owner log in shortcut
        </Button>
        <Button
          title="Player log in shortcut"
          onPress={handlePlayerLogin}>Player log in shortcut
        </Button>
      </View>
      {/** BELOW IS LOGIN FORM */}
      <View style={{ width: '100%', padding: 25, }}>
        <TextInput
          style={{ fontSize: 18, margin: 10 }}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />
        <TextInput
          style={{ fontSize: 18, margin: 10 }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />

        <Button
          onPress={handleLogin}
          title="Sign in"
        />
      </View>
    </>
        
  );
}

export default LoginPage;
