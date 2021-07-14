import axios from 'axios';

let tmpCollection = ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];

const backendClient = axios.create({
  baseURL: 'https://r9zg4fapic.execute-api.us-west-1.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const addCardToCollection = async (cardID: string): Promise<void> => {
  tmpCollection = tmpCollection.concat([cardID]);//for some reason push stop working ???
}

export const getCardCollection = async (): Promise<string[]> => {
    return tmpCollection;
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