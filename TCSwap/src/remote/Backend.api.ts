import axios from 'axios';
import User from '../models/user';

let tmpCollection = ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];

const backendClient = axios.create({
  baseURL: 'https://r9zg4fapic.execute-api.us-west-1.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const addCardToCollection = async (username: string, cardID: string): Promise<void> => {
  const game = 'YuGiOh!';
  const condition = 'Mint';
  const res = await backendClient.post<unknown>(`collections/${username}`, {cardID, game, condition});
  console.log(res);
}

// NOW working, was not working before because .get was sending second param(a empty body: {})
export const getCardCollection = async (username: string): Promise<string[]> => {
    const collection = await backendClient.get<any>(`collections/${username}`)
    
    let cardNames: string[] = [];
    collection.data.message.forEach((card: any) => {
      cardNames.push(card.card_identifier) 
    })
    return cardNames as string[];
}

export const getCardFeatured = async (): Promise<string[]> => {
  return ['Dark Magician'];
}

export const postCardFeatured = async (): Promise<boolean> => {
  return true;
}

export const testPostHelloFunc = async (name: string): Promise<string> => {
  const response = await backendClient.post<any>('hello', {
    name
  });
  return response.data
}

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const response = await backendClient.post<any>('/login', {
    username,
    password,
  });
  console.log(response);
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