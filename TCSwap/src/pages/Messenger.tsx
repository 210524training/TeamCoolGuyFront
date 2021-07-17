import * as React from 'react';
import { Button, StyleSheet, TextInput, Text, View, Alert, FlatList  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, GiftedChatState, IMessage } from 'react-native-gifted-chat'
import User from '../models/user';
import { useAppSelector } from '../redux';
import { postMessages, getMessages } from '../remote/Backend.api';

// interface customMessage {
  
//   messages: [
//     {
//       id: string,  //auto-generated
//       text: string, //auto-generated
//       createdAt: Date, //new Date()
//       user: {
//         id: number, //user.username
//         name: string, //user.username
//       },
//     },
//   ],
// }

const Messenger: React.FC<unknown> = () => {

  const user: User = useAppSelector((state) => {
    return state.user as User
})

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    (async () => {
      const data = await getMessages();
      console.log(data)
      setMessages(data)
    })()

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])

  }, [])

  const onSend = useCallback((messages = []) => {
    // send to backend
    postMessages(messages[0]);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    console.log(messages);
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
