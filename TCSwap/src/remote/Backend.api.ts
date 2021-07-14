import axios from 'axios';

const backendClient = axios.create({
  baseURL: 'https://r9zg4fapic.execute-api.us-west-1.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const getCardCollection = async (): Promise<string[]> => {
    return ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];
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