import axios from 'axios';

export async function getPopulationData(API_KEY: string, code: number) {
  const URL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${code}`;
  const res = await axios.get(URL, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  const population_data = res.data.result.data[0].data;
  const filltered_data = population_data.filter((element: any) => {
    return element.year % 10 === 0 && element.year <= 2020;
  });
  const population_array = filltered_data.map((obj: any) => {
    return obj.value;
  });

  return population_array;
}
