import axios from 'axios';

const tmpCollection = ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];

const backendClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const addCardToCollection = async (cardID: string): Promise<void> => {
  tmpCollection.push(cardID);
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