import axios from 'axios';

export async function getPrefectures(API_KEY: string) {
  const URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  const response = await axios.get(URL, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });
  return response;
}
