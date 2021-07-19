import * as React from 'react';
import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux';
import { loginAsync, selectUser, UserState } from '../redux/slices/user.slice'; 
import CustButton1 from '../components/CustButton1';
import Banner from '../components/Banner';

type Props = { navigation: any }

const LoginPage: React.FC<Props> = ({ navigation }) => {

  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [testGreeting, SetTestGreeting] = useState<any>('');

  const dispatch = useAppDispatch();

  const handleLogin= async()=>{
    const result = await dispatch(loginAsync({username, password}));
    if(result.meta.requestStatus ==='fulfilled'){
      const currUser = result.payload as UserState;
      if(currUser){
        if(currUser.role === 'player'){
          navigation.navigate('Players');
        }
        else{
          navigation.navigate('Store Owners');
        }
      }
    }else{
      alert('login failed');
    }
  }

  return (
    <>
      {/** BELOW IS LOGIN FORM */}
      <Banner text={''} />
      <Banner text={'TC Swap'} />
      <View style={{ width: '100%', padding: 25 }}>
        <Text >Username:</Text>
        <TextInput
          style={{ fontSize: 18, margin: 10, backgroundColor: 'white' }}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          defaultValue={username}
        />
        <Text >Password:</Text>
        <TextInput
          style={{ fontSize: 18, margin: 10, backgroundColor: 'white' }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          defaultValue={password}
        />

     
        <CustButton1 onPress={handleLogin} title="Sign in"/>
        
      <View>
        <Text>
        <Text>No account? Then register </Text>
          <Text
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
              }}
              onPress={()=>navigation.navigate('Register')}
            >
              here
            </Text>
            <Text>!</Text>
        </Text>
      </View>
      </View>
    </>
        
  );
}

export default LoginPage;
