import axios from 'axios';

const backendClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getCardCollection = async (): Promise<string[]> => {
    return ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];
}