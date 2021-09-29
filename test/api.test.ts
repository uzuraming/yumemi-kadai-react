import { getPrefectures } from '../pages/api/get_ prefectures';
import { getPopulationData } from '../pages/api/get_population_data';
import { API_KEY } from './.api_key';

const HOKKAIDO_CODE = 1; // 北海道のコード

async function testGetPrefectures() {
  const res = await getPrefectures(API_KEY);
  return res;
}
async function testGetPopulationData() {
  const res = await getPopulationData(API_KEY, HOKKAIDO_CODE);
  return res;
}

test('47都道府県をGETできる', async () => {
  const res: any = await testGetPrefectures();
  expect(res.data.result.length).toEqual(47);
});

test('北海道のデータが7個GETできる', async () => {
  const res: Array<number> = await testGetPopulationData();
  expect(res.length).toEqual(7);
});
