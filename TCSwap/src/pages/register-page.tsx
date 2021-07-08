import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../redux';
import { loginAsync, logout, selectUser, UserState } from '../redux/slices/user.slice'; 
import { useNavigation } from '@react-navigation/native';

type Props = { navigation: any }

const LoginPage: React.FC<Props> = ({ navigation }) => {

  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [role, setRole] = useState<'player'|'store owner'| ''>('');
  const dispatch = useAppDispatch();


  const handleRegister= async()=>{
      let outMsg:string ='';
      if(!username){
          alert('enter a user name');
          return;
      }
      if(!password){
          alert('enter a password');
          return;
      }
      if(!firstName){
          alert('enter your first name');
          return;
      }
      if(!lastName){
          alert('enter your last name');
          return;
      }
      if(!role){
          alert('select your role');
          return;
      }

      //login if register is successful
      const newUser={
        username,
        password,
        firstname: firstName,
        lastname: lastName,
        role
      };

      // register user
      alert(`registering {${newUser.username}}...}`);
  }

  return (
    <>

      
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
        <TextInput
          style={{ fontSize: 18, margin: 10 }}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          defaultValue={firstName}
        />
        <TextInput
          style={{ fontSize: 18, margin: 10 }}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          defaultValue={lastName}
        />
        <Picker
        selectedValue={role}
        style={{ height: 50, width: 150 }}
        onValueChange={(val, itemIndex) => {if(val==='player'||val==='store owner'||val===''){setRole(val);}}}
        >
            <Picker.Item label="Select Role" value={''} />
            <Picker.Item label="Player" value="player" />
            <Picker.Item label="Store Owner" value="store owner" />
        </Picker>

        <Button
          onPress={handleRegister}
          title="Register"
        />
      </View>
    </>
        
  );
}

export default LoginPage;
