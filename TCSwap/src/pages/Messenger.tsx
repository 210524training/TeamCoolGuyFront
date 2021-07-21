import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert, FlatList  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, GiftedChatState, IMessage } from 'react-native-gifted-chat'
import User from '../models/user';
import { useAppSelector } from '../redux';
import { postMessages, getMessages } from '../remote/Backend.api';

const Messenger: React.FC<unknown> = () => {

  const user: User = useAppSelector((state) => {
    return state.user as User
})

  const [messages, setMessages] = useState([]);

  const retrieveMessages = async () => {
    try {
      const data = await getMessages();
      const sortData = data.reverse()
      console.log('retrieved')
      setMessages(sortData)
    } catch(err) {
      console.log(err)
    }
    
  }
  
  useEffect(() => {
    retrieveMessages();
    setInterval(retrieveMessages, 10000)
  },[])

  const onSend = useCallback((messages = []) => {
    // send to backend
    postMessages(messages[0]);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, [])
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.username,
        name: user.username,
      }}
      renderUsernameOnMessage={true}
    />
  )
}

export default Messenger;
