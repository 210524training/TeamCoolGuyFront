import axios from 'axios';
import DBCard from '../models/DBCard';
import Message from '../models/Message';
import User from '../models/user';

const backendClient = axios.create({
  baseURL: 'https://r9zg4fapic.execute-api.us-west-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

/**
 * 
 * PLAYERS
 * 
 */

export const addCardToCollection = async (username: string, cardID: string, game: string, condition: string): Promise<void> => {
  const res = await backendClient.post<unknown>(`collections/${username}`, {cardID, game, condition});
}

export const getCardCollection = async (username: string): Promise<DBCard[]> => {
  const collection = await backendClient.get<{ message: DBCard[] }>(`collections/${username}`);
  return collection.data.message;
}

/**
 * 
 * MESSANGER
 * 
 */

//  const formatRows: IMessage[] = rows.array.map((row: Message) => {
//   return {
//     _id: row.id,
//     text: row.text,
//     createdAt: row.created_at,
//     user: { 
//       _id: row.created_by,
//       name: row.created_by
//     }
//   }
// });

export const postMessages = async (message: Message): Promise<void> => {
  const { _id, text, createdAt, user } = message
  
  const res = await backendClient.post<any>(`messages`, {
    id: _id,
    text,
    created_at: createdAt,
    created_by: user.name

  })
}

export const getMessages = async (): Promise<any> => {
  const res = await backendClient.get<any>(`messages`)
  return res.data.messages
}

/**
 * 
 * MANAGE-STORE Section
 * 
 */

export const getUsersStore = async (username: string): Promise<Object> => {
  const data = await backendClient.get<any>(`store/${username}`);
  return data.data.message
}

export const getCardFeatured = async (username: string): Promise<string[]> => {
  const data = await backendClient.get<any>(`store/featured/${username}`)

  if (data.data.message) {
    return data.data.message
  }
  return []
}

export const postFeaturedCard = async (storeName: string, featuredCardId: number | undefined): Promise<boolean> => {
  const data = await backendClient.post<any>('store/featured', {
    storeName,
    featuredCardId
  })
  return data.data.message;
}

/**
 * 
 * TESTING LAMBDA
 * 
 */

export const testPostHelloFunc = async (name: string): Promise<string> => {
  const response = await backendClient.post<any>('hello', {
    name
  });
  return response.data
}

/**
 * 
 * LOGIN / REGISTER
 * 
 */

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const response = await backendClient.post<any>('/login', {
    username,
    password,
  });
  if(!response.data.loginResult) {
    throw new Error("invalid login!");
  }
  return response.data.user as User;
}

export const registerUser = async (user: User): Promise<boolean> => {
  const response = await backendClient.post<any>('/register', {
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
 
  return response.data.registerResult as boolean;
}