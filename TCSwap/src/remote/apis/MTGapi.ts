import axios, { AxiosResponse } from 'axios';
import MagicCard from '../../models/MagicCard';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests
const mtgClient = axios.create({
  baseURL: 'https://api.magicthegathering.io/v1/cards',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCardByFuzzyName = async (name: string): Promise<MagicCard[]> => {
    const url = '?name=' + name;
    const response = await mtgClient.get<{ cards: MagicCard[] }>(url);
    return response.data.cards;
  }