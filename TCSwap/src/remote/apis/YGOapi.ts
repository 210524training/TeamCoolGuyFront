import axios, { AxiosResponse } from 'axios';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests
const ygoClient = axios.create({
  baseURL: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCardByName = async (name: string): Promise<any> => {
    const url = '?name=' + name;
    const response = await ygoClient.get<unknown>(url);
    return response.data;
}