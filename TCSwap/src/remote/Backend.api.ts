import axios from 'axios';

let tmpCollection = ['Dark Magician', 'Blue-Eyes White Dragon', 'Dark Hole', 'Mirror Force'];

const backendClient = axios.create({
  baseURL: 'https://25hxwtfg72.execute-api.us-west-1.amazonaws.com/dev/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const addCardToCollection = async (cardID: string): Promise<void> => {
  tmpCollection = tmpCollection.concat([cardID]);//for some reason push stop working ???
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